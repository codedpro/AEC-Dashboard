import React, { useEffect, useState } from "react";
import axios from "axios";
import ProtectionSelect from "./ProtectionSelect";
import MwAntSizeSelect from "./MwAntSizeSelect";
import YesNoSelectWithImage from "./YesNoSelectWithImage";
import SiteIdInputWithImage from "./SiteIdInputWithImage ";
import CongratsPage from "./CongratsPage";
import { userService } from "src/services";
import ImageUpload from "./ImageUpload";
import GSMAntennaForm from "./GESMantform";

const RigerForm: React.FC = () => {
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
  const [isCongrats, setIsCongrats] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [antSerial, setAntSerial] = useState<File[]>([]);
  const [antIsolation, setAntIsolation] = useState<File[]>([]);
  const [numAntennaForms, setNumAntennaForms] = useState(1);
  const [antennaSizes, setAntennaSizes] = useState({});
  const [antennaValues, setAntennaValues] = useState({});
  const [allImagesUploaded, setAllImagesUploaded] = useState(false);
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
  const handleImagesUploadSuccess = () => {
    setAllImagesUploaded(true);
  };
  const [protectionSelectStates, setProtectionSelectStates] = useState<
    Record<string, boolean>
  >({});

  const [protectionValues, setProtectionValues] = useState<
    Record<string, string>
  >({});
  const [antennaData, setAntennaData] = useState<{ [key: string]: string }[]>(
    []
  );

  const [protectionValueskey, setProtectionValueskey] = useState<string[]>([]);
  const [protectionValuesData, setProtectionValuesData] = useState<
    { key: string; value: string }[]
  >([]);
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleAntennaSizeChange = (
    key: string,
    value: string,
    index: number
  ) => {
    const combinedKey = `${key}_${index}`;
    const updatedData = [...antennaData];
    const existingDataIndex = updatedData.findIndex(
      (item) => item.key === combinedKey
    );

    if (existingDataIndex !== -1) {
      updatedData[existingDataIndex].value = value;
    } else {
      updatedData.push({ key: combinedKey, value });
    }

    setAntennaData(updatedData);
  };
  const renderFormContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
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
                isSubmitting ||
                !siteId ||
                !siteIdImage ||
                !roadArrestor ||
                !aviationLight ||
                !light
                  ? "opacity-50 cursor-not-a1llowed"
                  : ""
              }`}
              disabled={
                isSubmitting ||
                !siteId ||
                !siteIdImage ||
                !roadArrestor ||
                !aviationLight ||
                !light
              }
            >
              Next
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="font-bold text-xl text-center mb-2 text-black">
              GESM ANT{" "}
            </h2>
            <ImageUpload
              title={`Ant Serial`}
              maxImages={10}
              onImagesUpload={setAntSerial}
              currentImage={antSerial}
              setCurrentImage={setAntSerial}
            />
            <ImageUpload
              title={`Ant isolation`}
              maxImages={10}
              onImagesUpload={setAntIsolation}
              currentImage={antIsolation}
              setCurrentImage={setAntIsolation}
            />
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
                Number of Antenna Forms
              </label>
              <select
                value={numAntennaForms}
                onChange={(e) => setNumAntennaForms(parseInt(e.target.value))}
                className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
                required
              >
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-700">&#9660;</span>
              </div>
            </div>
            {Array.from({ length: numAntennaForms }, (_, index) => (
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
            ))}

            <button
              onClick={handlePrevious}
              type="button"
              className={`bg-red-600 text-white px-4 py-2 rounded-lg 
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              type="button"
              className={`bg-red-600 text-white px-4 py-2 rounded-lg ${
                isSubmitting || (!antIsolation && !antSerial)
                  ? "opacity-50 cursor-not-a1llowed"
                  : ""
              }`}
              disabled={isSubmitting || (!antIsolation && !antSerial)}
            >
              Next
            </button>
          </>
        );
      case 3:
        return (
          <>
            <h2>3rd page</h2>
            <button
              type="button"
              onClick={handlePrevious}
              className={`bg-red-600 text-white px-4 py-2 rounded-lg 
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className={`bg-red-600 text-white px-4 py-2 rounded-lg ${
                isSubmitting ||
                !(
                  siteId &&
                  siteIdImage &&
                  roadArrestor &&
                  aviationLight &&
                  light
                )
                  ? "opacity-50 cursor-not-a1llowed"
                  : ""
              }`}
              disabled={
                isSubmitting ||
                !(
                  siteId &&
                  siteIdImage &&
                  roadArrestor &&
                  aviationLight &&
                  light
                )
              }
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </>
        );
      default:
        return null;
    }
  };

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
  const areAllProtectionSelectsSuccessful = () => {
    for (const key in protectionSelectStates) {
      if (!protectionSelectStates[key]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!areAllProtectionSelectsSuccessful()) {
        console.error("Not all ProtectionSelect components are successful.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append(
        "username2",
        userService.getFirstName() + " " + userService.getLastName()
      );
      formData.append(
        "username",
        userService.getFirstName() + " " + userService.getLastName()
      );
      if (siteId) {
        formData.append("siteId2", siteId);
      }
      formData.append("siteId", siteId);
      if (siteIdImage) {
        formData.append("siteIdImage", siteIdImage);
      }
      formData.append("roadArrestor", roadArrestor);
      for (const file of roadArrestorImages) {
        formData.append("roadArrestorImages", file);
      }
      formData.append("aviationLight", aviationLight);
      for (const file of aviationLightImages) {
        formData.append("aviationLightImages", file);
      }
      formData.append("light", light);
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
      for (const file of antIsolation) {
        formData.append("antIsolation", file);
      }
      for (const file of antSerial) {
        formData.append("antSerial", file);
      }
      for (const key in protectionValues) {
        formData.append(key, protectionValues[key]);
      }
      antennaData.forEach((dataItem) => {
        const [key, value] = Object.entries(dataItem)[0];
        formData.append(key, value);
      });
      const response = await axios.post("/api/rigerform", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setIsSubmitting(false);
        setIsCongrats(true);
      } else {
        console.error("Error submitting form:", response.data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setIsSubmitting(false);
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
              <form>{renderFormContent()}</form>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default RigerForm;
