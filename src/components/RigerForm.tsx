import React, { useEffect, useState } from "react";
import axios from "axios";
import ProtectionSelect from "./ProtectionSelect";
import MwAntSizeSelect from "./MwAntSizeSelect";
import YesNoSelectWithImage from "./YesNoSelectWithImage";
import SiteIdInputWithImage from "./SiteIdInputWithImage ";
import CongratsPage from "./CongratsPage";
import { userService } from "src/services";
import GSMAntennaForm from "./GESMantform";
import ImageUpload from "./ImageUpload";
import MyProgressBar from "./Progressbar";

const RigerForm: React.FC = () => {
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);
  const [antennaSizeValues, setAntennaSizeValues] = useState<{
    [key: string]: boolean;
  }>({});
  const [siteId, setSiteId] = useState<string>("");
  const [siteIdImage, setSiteIdImage] = useState<File | null>(null);
  const [roadArrestor, setroadArrestor] = useState<string>("");
  const [roadArrestorImages, setroadArrestorImages] = useState<File[]>([]);
  const [aviationLight, setAviationLight] = useState<string>("");
  const [aviationLightImages, setAviationLightImages] = useState<File[]>([]);
  const [light, setLight] = useState<string>("");
  const [lightImages, setLightImages] = useState<File[]>([]);
  const [mwAntSize, setMwAntSize] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numAntennaForms, setNumAntennaForms] = useState();
  const [tddAnt, setTddAnt] = useState<string>();
  const [isolation, setIsolation] = useState<File[]>([]);
  const [Serial, setSerial] = useState<File[]>([]);
  const [Ground, setGround] = useState<File[]>([]);
  const [Label, setLabel] = useState<File[]>([]);
  const [isCongrats, setIsCongrats] = useState(false);
  const [antennaQuantities, setAntennaQuantities] = useState<{
    "30": number;
    "60": number;
    "90": number;
    "120": number;
  }>({
    "30": "",
    "60": "",
    "90": "",
    "120": "",
  });
  const [progress, setProgress] = useState<number>(0);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const [antSerials, setAntSerials] = useState(
    Array.from({ length: 10 }, () => [])
  );
  const [antIsolations, setAntIsolations] = useState(
    Array.from({ length: 10 }, () => [])
  );

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleImagesUploadSuccess = () => {
    setAllImagesUploaded(true);
  };
  const isNextButtonDisabled = () => {
    if (currentPage === 1) {
      return !(
        siteId &&
        siteIdImage &&
        roadArrestor &&
        aviationLight &&
        light &&
        aviationLightImages.length > 0 &&
        roadArrestorImages.length > 0 &&
        lightImages.length > 0
      );
    } else if (currentPage === 2) {
      return !numAntennaForms;
    } else {
      return false;
    }
  };
  const isSubmitButtonDisabled = () => {
    return !(
      tddAnt === "No" ||
      !(
        tddAnt !== "Yes" &&
        Serial &&
        isolation &&
        Ground &&
        Label &&
        siteId &&
        siteIdImage
      )
    );
  };

  const handleAntennaSizeChange = (key: string, value: string) => {
    const updatedValues = {
      ...antennaSizeValues,
      [`${key}`]: value === "Yes",
    };
    setAntennaSizeValues(updatedValues);
    console.log(antennaSizeValues);
  };

  const [protectionValues, setProtectionValues] = useState<
    Record<string, string>
  >({});
  const [protectionValueskey, setProtectionValueskey] = useState<string[]>([]);
  const [protectionValuesData, setProtectionValuesData] = useState<
    { key: string; value: string }[]
  >([]);
  const renderProtectionSelects = (antennaSize: string, quantity: string) => {
    const protectionSelects = [];
    for (let i = 1; i <= parseInt(quantity); i++) {
      protectionSelects.push(
        <ProtectionSelect
          key={`${antennaSize}_${i}`}
          mwAntSize={mwAntSize}
          mwAntSizecondition={antennaSize}
          index={i}
          isRigerFormSubmit={isSubmitting}
          siteid={siteId}
          onProtectionChange={(key, value) =>
            handleProtectionChange(key, value)
          }
        />
      );
    }
    return protectionSelects;
  };

  useEffect(() => {
    const protectionData = protectionValueskey.map((key, index) => ({
      key,
      value: protectionValues[key],
    }));

    setProtectionValuesData(protectionData);
  }, [protectionValues, protectionValueskey]);

  const handleProtectionChange = (key, value) => {
    setProtectionValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append(
        "username2",
        userService.getFirstName() + " " + userService.getLastName()
      );
      formData.append(
        "username",
        userService.getFirstName() + " " + userService.getLastName()
      );
      for (let i = 0; i < numAntennaForms; i++) {
        formData.append(`antSerial_${i}`, JSON.stringify(antSerials[i]));
        formData.append(`antIsolation_${i}`, JSON.stringify(antIsolations[i]));
      }
      if (siteId) {
        formData.append("siteId2", siteId);
      }
      if (siteId) {
        formData.append("siteId", siteId);
      }
      if (siteIdImage) {
        formData.append("siteIdImage", siteIdImage);
      }
      if (roadArrestor) {
        formData.append("roadArrestor", roadArrestor);
      }
      for (const file of roadArrestorImages) {
        formData.append("roadArrestorImages", file);
      }
      if (aviationLight) {
        formData.append("aviationLight", aviationLight);
      }
      for (const file of aviationLightImages) {
        formData.append("aviationLightImages", file);
      }
      if (light) {
        formData.append("light", light);
      }
      for (const file of lightImages) {
        formData.append("lightImages", file);
      }
      if (mwAntSize) {
        let mwAntSizeValue = "";
        if (Array.isArray(mwAntSize)) {
          mwAntSizeValue = mwAntSize.join(",");
        } else {
          mwAntSizeValue = mwAntSize;
        }
        formData.append("mwAntSize", mwAntSizeValue);
      }

      for (const key in protectionValues) {
        formData.append(key, protectionValues[key]);
      }

      for (const [key, value] of Object.entries(antennaSizeValues)) {
        formData.append(`${key}`, value ? "Yes" : "No");
      }
      if (tddAnt) {
        formData.append("TDDAnt", tddAnt);
      }
      const response = await axios.post("/api/rigerform", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
        },
      });

      if (response.status === 200) {
        setIsCongrats(true);
        setIsSubmitting(false);
      } else {
        console.error("Error 2 submitting form:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  return (
    <>
      {isCongrats === true ? (
        <CongratsPage
          text="Congratulations! Your Riger Form has been submitted."
          backgroundColor="rgb(63, 81, 181)"
          textColor="text-gray-800"
          confettiColors={["#FF6B6B", "#FCD34D", "#48BB78", "#4299E1"]}
          numberOfConfetti={600}
          redirectTo="/DataBase"
        />
      ) : (
        <>
          <div className="text-black min-h-screen flex items-center justify-center ">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Riger Level Form
              </h1>
              <form>
                <div className={`${currentPage !== 1 ? "hidden" : ""}`}>
                  <SiteIdInputWithImage
                    siteId={siteId}
                    setSiteId={setSiteId}
                    siteIdImage={siteIdImage}
                    setSiteIdImage={setSiteIdImage}
                  />
                  <YesNoSelectWithImage
                    label="Road Arrestor"
                    selectedOption={roadArrestor}
                    setSelectedOption={setroadArrestor}
                    onImagesUpload={setroadArrestorImages}
                    maxImages={4}
                    images={roadArrestorImages}
                  />
                  <YesNoSelectWithImage
                    label="Aviation Light"
                    selectedOption={aviationLight}
                    setSelectedOption={setAviationLight}
                    onImagesUpload={setAviationLightImages}
                    maxImages={4}
                    images={aviationLightImages}
                  />
                  <YesNoSelectWithImage
                    label="Light"
                    selectedOption={light}
                    setSelectedOption={setLight}
                    onImagesUpload={setLightImages}
                    maxImages={4}
                    images={lightImages}
                  />
                  <MwAntSizeSelect
                    selectedSizes={mwAntSize}
                    setSelectedSizes={setMwAntSize}
                  />
                  {mwAntSize.includes("30") && (
                    <>
                      <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
                        Quantity of 30 Antennas
                      </label>
                      <div className="relative">
                        <select
                          value={antennaQuantities["30"]}
                          onChange={(e) =>
                            setAntennaQuantities({
                              ...antennaQuantities,
                              "30": e.target.value,
                            })
                          }
                          className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                          required
                        >
                          <option value="" className="text-gray-700">
                            Select Quantity of 30 Antennas
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                            <option
                              key={quantity}
                              value={quantity}
                              className="text-gray-700"
                            >
                              {quantity}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-700">&#9660;</span>
                        </div>
                      </div>
                      {renderProtectionSelects("30", antennaQuantities["30"])}
                    </>
                  )}

                  {mwAntSize.includes("60") && (
                    <>
                      <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
                        Quantity of 60 Antennas
                      </label>
                      <div className="relative">
                        <select
                          value={antennaQuantities["60"]}
                          onChange={(e) =>
                            setAntennaQuantities({
                              ...antennaQuantities,
                              "60": e.target.value,
                            })
                          }
                          className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                          required
                        >
                          <option value="" className="text-gray-700">
                            Select Quantity of 60 Antennas
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                            <option
                              key={quantity}
                              value={quantity}
                              className="text-gray-700"
                            >
                              {quantity}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-700">&#9660;</span>
                        </div>
                      </div>
                      {renderProtectionSelects("60", antennaQuantities["60"])}
                    </>
                  )}

                  {mwAntSize.includes("90") && (
                    <>
                      <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
                        Quantity of 90 Antennas
                      </label>
                      <div className="relative">
                        <select
                          value={antennaQuantities["90"]}
                          onChange={(e) =>
                            setAntennaQuantities({
                              ...antennaQuantities,
                              "90": e.target.value,
                            })
                          }
                          className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                          required
                        >
                          <option value="" className="text-gray-700">
                            Select Quantity of 90 Antennas
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                            <option
                              key={quantity}
                              value={quantity}
                              className="text-gray-700"
                            >
                              {quantity}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-700">&#9660;</span>
                        </div>
                      </div>
                      {renderProtectionSelects("90", antennaQuantities["90"])}
                    </>
                  )}

                  {mwAntSize.includes("120") && (
                    <>
                      <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
                        Quantity of 120 Antennas
                      </label>
                      <div className="relative">
                        <select
                          value={antennaQuantities["120"]}
                          onChange={(e) =>
                            setAntennaQuantities({
                              ...antennaQuantities,
                              "120": e.target.value,
                            })
                          }
                          className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                          required
                        >
                          <option value="" className="text-gray-700">
                            Select Quantity of 120 Antennas
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                            <option
                              key={quantity}
                              value={quantity}
                              className="text-gray-700"
                            >
                              {quantity}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-700">&#9660;</span>
                        </div>
                      </div>
                      {renderProtectionSelects("120", antennaQuantities["120"])}
                    </>
                  )}
                  <button
                    onClick={handleNext}
                    type="button"
                    className={`bg-red-600 text-white px-4 py-2 rounded-lg ${
                      isNextButtonDisabled()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={isNextButtonDisabled()}
                  >
                    Next
                  </button>
                </div>
                <div className={`${currentPage !== 2 ? "hidden" : ""}`}>
                  <h2 className="font-bold text-xl text-center mb-2 text-black">
                    GSM ANT{" "}
                  </h2>

                  <div className="relative">
                    <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
                      Number of GSM Antennas
                    </label>

                    <select
                      value={numAntennaForms}
                      onChange={(e) =>
                        setNumAntennaForms(parseInt(e.target.value))
                      }
                      className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                      required
                    >
                      <option className="text-gray-700" value="">
                        Select Number of GSM Antennas
                      </option>
                      {[...Array(10).keys()].map((num) => (
                        <option
                          key={num + 1}
                          value={num + 1}
                          className="text-gray-700"
                        >
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <div className="absolute mt-4 inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-700">&#9660;</span>
                    </div>
                  </div>
                  {Array.from({ length: numAntennaForms }, (_, index) => (
                    <>
                      <label
                        className="block text-gray-700 text-sm font-extrabold mb-1 ml-1 p-2 border rounded bg-gray-200"
                        style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                      >
                        {`Antenna ${index + 1}`}
                      </label>

                      <ImageUpload
                        title={`Ant Serial ${index + 1}`}
                        maxImages={10}
                        onImagesUpload={(images) => {
                          const newAntSerials = [...antSerials];
                          newAntSerials[index] = images;
                          setAntSerials(newAntSerials);
                        }}
                        currentImage={antSerials[index]}
                        setCurrentImage={(images) => {
                          const newAntSerials = [...antSerials];
                          newAntSerials[index] = images;
                          setAntSerials(newAntSerials);
                        }}
                      />
                      <ImageUpload
                        title={`Ant Isolation ${index + 1}`}
                        maxImages={10}
                        onImagesUpload={(images) => {
                          const newAntIsolations = [...antIsolations];
                          newAntIsolations[index] = images;
                          setAntIsolations(newAntIsolations);
                        }}
                        currentImage={antIsolations[index]}
                        setCurrentImage={(images) => {
                          const newAntIsolations = [...antIsolations];
                          newAntIsolations[index] = images;
                          setAntIsolations(newAntIsolations);
                        }}
                      />
                      <GSMAntennaForm
                        key={index}
                        index={index + 1}
                        siteid={siteId}
                        isRigerFormSubmit={isSubmitting}
                        onImagesUploadSuccess={handleImagesUploadSuccess}
                        onAntennaSizeChange={(key: string, value: string) =>
                          handleAntennaSizeChange(key, value, index + 1)
                        }
                      />
                    </>
                  ))}

                  <button
                    type="button"
                    onClick={handlePrevious}
                    className={`bg-red-600 text-white px-4 py-2 rounded-lg mt-2
                     
                      `}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`bg-red-600 text-white px-4 py-2 rounded-lg ml-2 mt-2 ${
                      isNextButtonDisabled()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={isNextButtonDisabled()}
                  >
                    Next
                  </button>
                </div>

                <div className={`${currentPage !== 3 ? "hidden" : ""}`}>
                  <h2 className="font-bold text-xl text-center mb-2 text-black">
                    TDD Ant
                  </h2>{" "}
                  <div className="relative">
                    <label className="block text-gray-700 text-sm font-bold mb-1 ml-1 mt-2">{`TDD`}</label>
                    <select
                      className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                      required
                      value={tddAnt}
                      onChange={(e) => setTddAnt(e.target.value)}
                    >
                      <option className="text-gray-700" value="">
                        Does it have TDD
                      </option>
                      <option className="text-gray-700" value="Yes">
                        Yes
                      </option>
                      <option className="text-gray-700" value="No">
                        No
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-700">&#9660;</span>
                    </div>
                  </div>
                  {tddAnt === "Yes" && (
                    <>
                      <label className="block text-gray-700 text-sm font-extrabold mb-1 mt-2 ">{`RRU 3500`}</label>
                      <ImageUpload
                        title={`Isolation`}
                        maxImages={10}
                        onImagesUpload={setIsolation}
                        currentImage={isolation}
                        setCurrentImage={setIsolation}
                      />
                      <ImageUpload
                        title={`Serial`}
                        maxImages={10}
                        onImagesUpload={setSerial}
                        currentImage={Serial}
                        setCurrentImage={setSerial}
                      />

                      <ImageUpload
                        title={`Ground`}
                        maxImages={10}
                        onImagesUpload={setGround}
                        currentImage={Ground}
                        setCurrentImage={setGround}
                      />
                      <ImageUpload
                        title={`Label`}
                        maxImages={10}
                        onImagesUpload={setLabel}
                        currentImage={Label}
                        setCurrentImage={setLabel}
                      />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className={`bg-red-600 text-white px-3 py-2 rounded-lg mt-2
                     
                      `}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`bg-red-600 text-white px-4 py-2 rounded-lg ml-2 mt-2 ${
                      isSubmitButtonDisabled()
                        ? "opacity-50 cursor-not-a1llowed"
                        : ""
                    }`}
                    disabled={isSubmitButtonDisabled()}
                  >
                    {isSubmitting ? "Uploading ..." : "Submit"}
                  </button>
                  {isSubmitting && (
                    <div className="mt-2">
                      <MyProgressBar progress={progress} />
                    </div>
                  )}
                </div>
              </form>{" "}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default RigerForm;
