import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { userService } from "src/services";
import MyProgressBar from "./Progressbar";

interface GSMAntennaFormProps {
  index: number;
  isRigerFormSubmit: boolean;
  onAntennaSizeChange: (key: string, value: string) => void;
  siteid: string;
  onImagesUploadSuccess: () => void;
}

const GSMAntennaForm: React.FC<GSMAntennaFormProps> = ({
  index,
  isRigerFormSubmit,
  onAntennaSizeChange,
  siteid,
  onImagesUploadSuccess,
}) => {
  const [antennaSizes, setAntennaSizes] = useState({
    "900": "-",
    "1800": "-",
    "2100": "-",
    "2600": "-",
    "2300": "-",
  });

  const handleAntennaSizeChange = (key: string, value: string) => {
    const updatedAntennaSizes = { ...antennaSizes, [key]: value };
    setAntennaSizes(updatedAntennaSizes);
    onAntennaSizeChange(`${key}_${index}`, value);
  };
  const [progress, setProgress] = useState<number>(0);

  const [antennaImages, setAntennaImages] = useState<{
    [key: string]: {
      isolation: File[];
      serial: File[];
      ground: File[];
      label: File[];
    };
  }>({
    "900": { isolation: [], serial: [], ground: [], label: [] },
    "1800": { isolation: [], serial: [], ground: [], label: [] },
    "2100": { isolation: [], serial: [], ground: [], label: [] },
    "2600": { isolation: [], serial: [], ground: [], label: [] },
    "2300": { isolation: [], serial: [], ground: [], label: [] },
  });

  useEffect(() => {
    if (isRigerFormSubmit) {
      handleSubmit();
    }
  }, [isRigerFormSubmit]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "username2",
        userService.getFirstName() + " " + userService.getLastName()
      );

      if (siteid) {
        formData.append("siteId2", siteid);
      }
      for (const [antennaSize, value] of Object.entries(antennaSizes)) {
        if (value === "Yes") {
          const images = antennaImages[antennaSize];
          for (const type in images) {
            images[type].forEach((file) => {
              formData.append(`${type}_${antennaSize}_${index}`, file);
            });
          }
        }
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
        console.log("Data sent successfully");
        onImagesUploadSuccess();
      } else {
        console.error("Error sending data:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  };
  return (
    <div className="antenna-form">
      {Object.keys(antennaSizes).map((key) => (
        <div key={key}>
          <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">{`RRU: ${key} - ${index}`}</label>
          <div className="relative">
            <select
              className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
              required
              value={antennaSizes[key]}
              onChange={(e) => handleAntennaSizeChange(key, e.target.value)}
            >
              <option className="text-gray-700" value="">
                Select RRU {key} - {index}
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

          {antennaSizes[key] === "Yes" && (
            <div>
              <ImageUpload
                title={`Isolation Images (${key}) - ${index}`}
                maxImages={10}
                onImagesUpload={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], isolation: files },
                  }));
                }}
                currentImages={antennaImages[key].isolation}
                setCurrentImages={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], isolation: files },
                  }));
                }}
              />
              <ImageUpload
                title={`Serial Images (${key}) - ${index}`}
                maxImages={10}
                onImagesUpload={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], serial: files },
                  }));
                }}
                currentImages={antennaImages[key].serial}
                setCurrentImages={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], serial: files },
                  }));
                }}
              />
              <ImageUpload
                title={`Ground Images (${key}) - ${index}`}
                maxImages={10}
                onImagesUpload={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], ground: files },
                  }));
                }}
                currentImages={antennaImages[key].ground}
                setCurrentImages={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], ground: files },
                  }));
                }}
              />
              <ImageUpload
                title={`Label Images (${key}) - ${index}`}
                maxImages={10}
                onImagesUpload={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], label: files },
                  }));
                }}
                currentImages={antennaImages[key].label}
                setCurrentImages={(files) => {
                  setAntennaImages((prevImages) => ({
                    ...prevImages,
                    [key]: { ...prevImages[key], label: files },
                  }));
                }}
              />
            </div>
          )}
        </div>
      ))}
      {isRigerFormSubmit && <MyProgressBar progress={progress} />}
    </div>
  );
};

export default GSMAntennaForm;
