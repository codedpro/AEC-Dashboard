import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { AdminLayout } from "@layout";
import axios from "axios"; 
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "src/utils/motion";
import Image from "next/image";
import { Button } from "react-bootstrap";
import UploadForm from "@components/FileUpload";
import formidable from "formidable";
import FileUpload from "@components/FileUpload";

const DSM: React.FC = () => {
  const [showFileManager, setShowFileManager] = useState(true);
  const [mainscreen, setMainscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(-1);
  const [editedFileName, setEditedFileName] = useState("");
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [Province, setProvince] = useState<string | null>(null);
  const [searchedSiteId, setSearchedSiteId] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [address, setaddress] = useState<string | null>(null);
  const [LATITUDE, setLATITUDE] = useState<string | null>(null);
  const [LONGITUDE, setLONGITUDE] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("/api/upload?action=list");
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const loadAndProcessFile = async (filename: string) => {
    try {
      setLoading(true);
      setShowFileManager(false);
      setMainscreen(false);
      const response = await axios.get(
        `/api/upload?action=load-and-process&filename=${filename}`
      );
      const excelData = response.data;
      setExcelData(excelData);
      setLoading(false);
      setShowFileManager(false);
      setMainscreen(true);
    } catch (error) {
      console.error("Error loading and processing file:", error);
    }
  };

  const copyDataToClipboard = (data: string, index: number) => {
    const textArea = document.createElement('textarea');
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
  
    try {
      document.execCommand('copy');
      setCopiedIndex(index);
      setTimeout(() => setIsCopying(false), 100);
      setTimeout(() => setCopiedIndex(null), 300);
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  };
  
  const CopyToClipboard = (data: string) => {
    if (isCopying) return;
    setIsCopying(true);

    navigator.clipboard.writeText(data).then(() => {
      setTimeout(() => setIsCopying(false), 100);
    });
  };

  const [excelData, setExcelData] = useState<string[][][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const uniqueCategories = Array.from(
    new Set(searchResults.flatMap((row) => Object.keys(row)))
  ).filter((category) => category !== "sheetName");
  const displayedSiteIds = new Set();

  useEffect(() => {
    fetchUploadedFiles();
    if (excelData.length === 0) {
      return;
    }

    const processedData = excelData.reduce(
      (accumulator, sheetData, sheetIndex) => {
        const processedSheetData = processData(sheetData, sheetIndex);
        return [...accumulator, ...processedSheetData];
      },
      []
    );

    const filteredResults = applySearchFilters(processedData);
    setSearchResults(filteredResults);
    if (searchedSiteId) {
    }
  }, [excelData, searchQuery, searchedSiteId]);

  const processData = (sheetData: string[][], sheetIndex: number) => {
    const categories = sheetData[0];
    const sheetName = excelData[sheetIndex].name;
    return sheetData.slice(1).map((row) => {
      const rowData = {};
      categories.forEach((category, index) => {
        rowData[category] = row[index];
      });
      return { sheetName, ...rowData };
    });
  };
  const applySearchFilters = (data: any[]) => {
    if (searchQuery.trim() === "") {
      return [];
    }

    const lowercaseSearchQuery = searchQuery.toLowerCase();
    const exactMatches = data.filter((row) => {
      const siteID = row["Site ID"];
      const city = row["City"];
      const Province = row["Province"];
      const address = row["address"];
      const TeamL = row["TeamL"];
      const LATITUDE = row["LATITUDE"];
      const LONGITUDE = row["LONGITUDE"];
      const lowercaseSearchQuery = searchQuery.toLowerCase();

      if (city && siteID.toLowerCase() === lowercaseSearchQuery) {
        setCity(city);
        if (Province && siteID.toLowerCase() === lowercaseSearchQuery) {
          if (Province === "Mazandaran" && TeamL === "Hassan Ghanbari") {
            setProvince(Province + " - East");
          } else if (Province === "Mazandaran" && TeamL === "Hadi Esmaeili") {
            setProvince(Province + " - West");
          } else {
            setProvince(Province);
          }
        }
        if (LATITUDE && siteID.toLowerCase() === lowercaseSearchQuery) {
          setLATITUDE(LATITUDE);
        }
        if (LONGITUDE && siteID.toLowerCase() === lowercaseSearchQuery) {
          setLONGITUDE(LONGITUDE);
        }
        if (address && siteID.toLowerCase() === lowercaseSearchQuery) {
          setaddress(address);
        }
        setSearchedSiteId(siteID);
        return true;
      }

      if (siteID && siteID.toLowerCase() === lowercaseSearchQuery) {
        setSearchedSiteId(siteID);
        return true;
      }
      return false;
    });

    if (exactMatches.length === 0) {
      setSearchedSiteId(null);
      setProvince(null);
      setCity(null);
    }

    return exactMatches;
  };

  const categoryConversion = [
    { name: "2G SOAC Date", type: "date" },
    { name: "U900 SOAC Date", type: "date" },
    { name: "U2100 SOAC Date", type: "date" },
    { name: "L900 SOAC Date", type: "date" },
    { name: "L1800 SOAC Date", type: "date" },
    { name: "L2100 SOAC Date", type: "date" },
    { name: "L2300 SOAC Date", type: "date" },
    { name: "L2600 SOAC Date", type: "date" },
    { name: "L3500 SOAC Date", type: "date" },
    { name: "NR3500 SOAC Date", type: "date" },
    { name: "Test Result", type: "time" },
  ];

  const formatData = (category: string, value: string): string => {
    const conversionInfo = categoryConversion.find(
      (conversion) => conversion.name === category
    );
    if (conversionInfo) {
      if (conversionInfo.type === "date") {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          const dateObj = new Date((numericValue - 25569) * 86400 * 1000);
          if (!isNaN(dateObj.getTime())) {
            return dateObj
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/ /g, "/");
          }
        }
      } else if (conversionInfo.type === "time") {
        const totalHours = parseFloat(value) * 24;
        if (totalHours >= 0 && totalHours <= 24) {
          const hours = Math.floor(totalHours);
          const minutes = Math.floor((totalHours - hours) * 60);
          const seconds = Math.floor(
            ((totalHours - hours) * 60 - minutes) * 60
          );
          const ampm = hours >= 12 ? "PM" : "AM";
          const formattedHours = hours % 12;

          return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds} `;
        }
      }
    }

    return value;
  };

  const containerLogos = {
    Cluster: "/assets/icons/cluster_logo.png",
    BB: "/assets/icons/bb_logo.png",
    Morning: "/assets/icons/morning_logo.png",
    SOCA: "/assets/icons/soca_logo.png",
    info: "/assets/icons/info_logo.png",
  };
  const categoryContainers = {
    Cluster: ["TL", "Phone", "FLM", "Account", "FLM Phone "],
    BB: [
      "Site Type",
      "# of Dep",
      "QTY",
      "Test Result",
      "WO",
      "WO Type",
      "Warranty-PT",
      "BB_PT",
      "PT_Title",
      "GSM_WO",
      "TDD_WO",
    ],
    Morning: ["BSC", "RNC", "Priority", "Status", "Power Type"],
    SOCA: [
      "2G SOAC Date",
      "U900 SOAC Date",
      "U2100 SOAC Date",
      "L900 SOAC Date",
      "L1800 SOAC Date",
      "L2100 SOAC Date",
      "L2300 SOAC Date",
      "L2600 SOAC Date",
      "L3500 SOAC Date",
      "NR3500 SOAC Date",
    ],
    info: [
      "PT",
      "Access Type",
      "Number Of Depends",
      "Depends1",
      "LL NAME",
      "phone",
      "PC NO",
    ],
  };

  const getCategoryContainer = (category) => {
    for (const container in categoryContainers) {
      if (categoryContainers[container].includes(category)) {
        return container;
      }
    }
    return "DefaultContainer";
  };
  return (
    <div className="violet-gradient">
      <AdminLayout>
        {showFileManager ? (
          <div className="uploaded-container">
            <ul>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="uploaded-file">
                  <p className="file-name">{file}</p>
                  <button
                    className="load-button"
                    onClick={() => loadAndProcessFile(file)}
                  >
                    Load
                  </button>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {loading ? (
          <div className="loader-container">
            <span className="loader"></span>{" "}
          </div>
        ) : (
          <></>
        )}
        {!mainscreen ? (
          <></>
        ) : (
          <>
            <div className="flex">
              <div className="left-address">
                {searchedSiteId && (
                  <img
                    width="40"
                    height="40"
                    src="/assets/icons/location.png"
                    alt="Location"
                    className="location"
                  />
                )}
                {searchedSiteId && <h1 className="Provincesec">{Province}</h1>}
                {searchedSiteId && (
                  <div className="flex flex-col justify-center items-center">
                    <div className="circle"></div>
                    <div className="rectangle"></div>
                  </div>
                )}

                {searchedSiteId && <p className="citysec ">{city}</p>}
              </div>

              <div className="right-address">
                {searchedSiteId && (
                  <p
                    onClick={() => CopyToClipboard(LATITUDE + "," + LONGITUDE)}
                    className="latlong"
                  >
                    {LATITUDE},{LONGITUDE}
                  </p>
                )}
                {searchedSiteId && (
                  <p
                    className="addressSec "
                    onClick={() => CopyToClipboard(address)}
                  >
                    {address}
                  </p>
                )}{" "}
                {searchedSiteId && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${LATITUDE}%2C${LONGITUDE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="mapicon"
                      width="50"
                      height="50"
                      src="/assets/icons/map.png"
                      alt="worldwide-location"
                    />
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search Site ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setSearchQuery(searchInput);
                  }
                }}
                className="rounded border-gray-300 px-2 py-2 w-100 text-black"
              />
              <Button onClick={() => setSearchQuery(searchInput)}>
                search
              </Button>
            </div>

            {searchedSiteId && (
              <div className="mt-4">
                <div className="dashboard-container">
                  {Object.keys(categoryContainers).map(
                    (containerName, containerIndex) => {
                      const containerLogo = containerLogos[containerName];
                      return (
                        <motion.div
                          variants={fadeIn(
                            "right",
                            "spring",
                            containerIndex * 0.5,
                            0.75
                          )}
                          key={containerIndex}
                          className={` ${"category-container green-pink-gradient shadow-card"}`}
                        >
                          <div className={`${"category-custom"}`}>
                            <div className="flex">
                              <Image
                                className="container-logo"
                                width="20"
                                height="20"
                                src={containerLogo}
                                alt={`${containerName}`}
                              />
                              <h2 className={`${"container-title"}`}>
                                {containerName}
                              </h2>
                            </div>
                            <span className={`${"title-line"}`}></span>
                            {uniqueCategories.map((category, categoryIndex) => {
                              if (
                                !categoryContainers[containerName].includes(
                                  category
                                )
                              ) {
                                return null;
                              }
                              return (
                                <div
                                  key={categoryIndex}
                                  className={`${"category-card"}`}
                                >
                                  <p className={`${"category-title"}`}>
                                    {category}
                                  </p>
                                  {searchResults.map((row, rowIndex) => {
                                    const data =
                                      category === "Site ID"
                                        ? row["Site ID"]
                                        : formatData(category, row[category]);
                                    if (
                                      category === "Site ID" &&
                                      displayedSiteIds.has(data)
                                    ) {
                                      return null;
                                    }
                                    if (category === "Site ID") {
                                      displayedSiteIds.add(data);
                                    }
                                    return (
                                      <p
                                        key={rowIndex}
                                        className="category-data-small"
                                        onClick={() =>
                                          copyDataToClipboard(
                                            data,
                                            categoryIndex
                                          )
                                        }
                                      >
                                        {data}
                                      </p>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </AdminLayout>
    </div>
  );
};

export default DSM;
