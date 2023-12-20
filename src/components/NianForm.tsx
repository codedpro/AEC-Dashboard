import React, { useState } from "react";
import axios from "axios";
import FileInput from "./fileinput";
import CongratsPage from "./CongratsPage";
import { userService } from "src/services";
import Card from "./Card";
import MyProgressBar from "./Progressbar";
const NianForm: React.FC = () => {
  const [siteID, setSiteID] = useState<string>("");
  const [siteidimage, setSiteIdImage] = useState<File[]>([]);
  //nian
  const [boost, setBoost] = useState<File[]>([]);
  const [BLVD, setBLVD] = useState<File[]>([]);
  const [BLVDsetting, setBLVDsetting] = useState<File[]>([]);
  const [currentlimit, setcurrentlimit] = useState<File[]>([]);
  const [batterystatus, setbatterystatus] = useState<File[]>([]);
  const [NCR, setNCR] = useState<File[]>([]);

  const [namayePower, setNamayePower] = useState<File[]>([]);
  const [psu, setPsu] = useState<File[]>([]);
  const [kolibatterybank, setKolibatterybank] = useState<File[]>([]);
  const [batteryserial, setBatterySerial] = useState<File[]>([]);
  const [batteryserialexcel, setBatterySerialexcel] = useState<File[]>([]);

  const [batteryvoltaj, setBatteryVoltaj] = useState<File[]>([]);
  const [loadsite, setLoadSite] = useState<File[]>([]);
  const [batteryfields, setBatteryFields] = useState<File[]>([]);
  const [voltajstrink, setVoltajstrink] = useState<File[]>([]);
  const [fiozbattery, setFiozbattery] = useState<File[]>([]);
  const [om, setOm] = useState<File[]>([]);
  const [twentym, setTwentym] = useState<File[]>([]);
  const [fortym, setFortym] = useState<File[]>([]);
  const [sixtym, setSixtym] = useState<File[]>([]);
  const [eightym, setEightym] = useState<File[]>([]);
  const [onehundredm, setOneHundredm] = useState<File[]>([]);
  const [onehundredtwentym, setOneHundredTwentym] = useState<File[]>([]);
  const [batterytags, setBatteryTags] = useState<File[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const firstName = userService.getFirstName();
  const lastName = userService.getLastName();
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const [ssvoltaj, setssvoltaj] = useState<File[]>([]);
  const [sslimit, setsslimit] = useState<File[]>([]);
  const [ssdekinfire, setssdekinfire] = useState<File[]>([]);
  const [ssllvd, setssllvd] = useState<File[]>([]);
  const [ssexcelvoltaj, setssexcelvoltaj] = useState<File[]>([]);

  const handleFileDrop = (
    files: File[],
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    setter([...files]);
  };

  const removeFile = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    const updatedFiles = [...setter];
    updatedFiles.splice(index, 1);
    setter(updatedFiles);
  };

  const handleCardClick = (card: string) => {
    setSelectedCard(card);
    setStep(2);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCard) {
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("siteID", siteID);
      formData.append("username", firstName + " " + lastName);

      if (selectedCard === "BatteryForm") {
        const variablesToAppend = [
          { field: "siteidimage", files: siteidimage },
          { field: "namayePower", files: namayePower },
          { field: "boost", files: boost },
          { field: "BLVD", files: BLVD },
          { field: "batteryserial", files: batteryserial }, // loadsite
          { field: "batteryserialexcel", files: batteryserialexcel }, // loadsite

          { field: "batteryvoltaj", files: batteryvoltaj },
          { field: "loadsite", files: loadsite }, // loadsite

          { field: "BLVDsetting", files: BLVDsetting },
          { field: "currentlimit", files: currentlimit },
          { field: "batterystatus", files: batterystatus },
          { field: "batteryfields", files: batteryfields },
          { field: "NCR", files: NCR },
          { field: "voltajstrink", files: voltajstrink },
          { field: "fiozbattery", files: fiozbattery },
          { field: "om", files: om },
          { field: "twentym", files: twentym },
          { field: "fortym", files: fortym },
          { field: "sixtym", files: sixtym },
          { field: "eightym", files: eightym },
          { field: "onehundredm", files: onehundredm },
          { field: "onehundredtwentym", files: onehundredtwentym },
          { field: "batterytags", files: batterytags },
        ];
        for (const { field, files } of variablesToAppend) {
          if (files.length > 0) {
            for (const file of files) {
              formData.append(field, file);
            }
          }
        }
      } else if (selectedCard === "ScreenShots") {
        const variablesToAppend = [
          { field: "ssexcelvoltaj", files: ssexcelvoltaj },
        ];

        for (const { field, files } of variablesToAppend) {
          if (files.length > 0) {
            for (const file of files) {
              formData.append(field, file);
            }
          }
        }
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
        },
      };

      const response = await axios.post("/api/nian", formData, config);

      if (response.status === 200) {
        setStep(1);
        setIsSubmitting(false);
        setHasSubmitted(true);
        setSiteIdImage([]);
        setNamayePower([]);
        setBoost([]);
        setBLVD([]);
        setcurrentlimit([]);
        setBatterySerial([]);
        setBatteryVoltaj([]);
        setbatterystatus([]);
        setNCR([]);
        setBLVDsetting([]);
        setBatteryFields([]);
        setVoltajstrink([]);
        setFiozbattery([]);
        setOm([]);
        setTwentym([]);
        setFortym([]);
        setSixtym([]);
        setEightym([]);
        setOneHundredm([]);
        setOneHundredTwentym([]);
        setBatteryTags([]);
        setssvoltaj([]);
        setsslimit([]);
        setssdekinfire([]);
        setssllvd([]);
        setssexcelvoltaj([]);
        setSelectedCard(null);
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
    <div className="container mt-5 inherit2 ">
      {step === 3 ? (
        <CongratsPage
          text="Congratulations! Your Battery Form has been submitted."
          backgroundColor="rgb(63, 81, 181)"
          textColor="white"
          confettiColors={["#FF5733", "#33FF57", "#5733FF", "#FFFF33"]}
          numberOfConfetti={400}
          redirectTo="/Battery"
        />
      ) : (
        <>
          {step === 0 && (
            <div>
              <h1 className="text-4xl font-bold mb-4 text-center">
                Battery Report
              </h1>
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  id="siteID"
                  value={siteID}
                  onChange={(e) => setSiteID(e.target.value.toUpperCase())}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && siteID.trim() !== "") {
                      setStep(1);
                    }
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  placeholder="Site ID"
                />
                <button
                  onClick={() => {
                    if (siteID.trim() !== "") {
                      setStep(1);
                    }
                  }}
                  className={`bg-gray-600 text-white px-4 py-2 rounded-lg ml-2 ${
                    siteID.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={siteID.trim() === ""}
                >
                  Enter
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="inherit2">
              <h2 className="text-xl mb-4 text-center">
                Choose your form for {siteID}
              </h2>

              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card
                  title="Battery Form"
                  description="Form for Nian Rack"
                  imageUrl="/assets/img/battery.jpg"
                  backgroundColor="rgb(51,101,138, 0.5)"
                  onCardClick={() => handleCardClick("BatteryForm")}
                />
                <Card
                  title="ScreenShots Form"
                  description="ScreenShots for Nian Rack"
                  imageUrl="/assets/img/working-remotely-1.jpg"
                  backgroundColor="rgb(51,101,138, 0.5)"
                  onCardClick={() => handleCardClick("ScreenShots")}
                />
              </div>

              <div className=" flex justify-center items-center ">
                <button
                  onClick={() => {
                    if (hasSubmitted) {
                      setStep(3);
                    }
                  }}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg mt-4${
                    hasSubmitted ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!hasSubmitted}
                >
                  Finish
                </button>
              </div>
            </div>
          )}
          {selectedCard === "BatteryForm" && (
            <>
              <div className="font-sans text-right">
                <h2 className="mb-4 px-2 py-3 text-white bg-gray-700 rounded-lg bg-opacity-80 text-center">
                  You are filling information of {siteID} - Nian {selectedCard}
                </h2>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس از کد سایت
                  </label>
                  <FileInput files={siteidimage} onChange={setSiteIdImage} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    DCDU - NCU عکس کلی نمای پاور شلف - بانک باتری - سنسور تمپ
                    فیوز
                  </label>
                  <FileInput files={namayePower} onChange={setNamayePower} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    باتری ها Float و Boost عکس از قسمت
                  </label>
                  <label className="block font-semibold mb-2">
                    (setting - Rec setting - float charge / boost charge)
                  </label>
                  <FileInput files={boost} onChange={setBoost} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    BLVD و LLVD عکس از
                  </label>
                  <label className="block font-semibold mb-2">
                    (setting menu - system setting - LVBD setting )
                  </label>
                  <label className="block font-semibold mb-2">
                    ={">"} LLVD = Disable
                  </label>
                  <label className="block font-semibold mb-2">
                    ={">"} BLVD = Enable
                  </label>
                  <FileInput files={BLVD} onChange={setBLVD} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    BLVD و LLVD تنظیمات ولتاژ
                  </label>
                  <label className="block font-semibold mb-2">
                    setting - Battery Setting - Error mergin
                  </label>
                  <label className="block font-semibold mb-2">
                    ={">"} weekvol = 44v
                  </label>
                  <label className="block font-semibold mb-2">
                    ={">"} toweek = 42v
                  </label>
                  <FileInput files={BLVDsetting} onChange={setBLVDsetting} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس از کارنت لیمیت قسمت باتری
                  </label>
                  <label className="block font-semibold mb-2">
                    setting menu - battery setting - current limit - limit level
                  </label>
                  <label className="block font-semibold mb-2">
                    [بسته به ظرفیت باتری ها مقدار بین 10 تا 20 تغییر میکنه]
                  </label>
                  <FileInput files={currentlimit} onChange={setcurrentlimit} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    وضعیت باتر ها بر روی نمایشگر و ظرفیت کلی باتری
                  </label>
                  <label className="block font-semibold mb-2">
                    status mcr - battery status - battery 11 battery 2
                  </label>
                  <FileInput
                    files={batterystatus}
                    onChange={setbatterystatus}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    ها و نای نزدیک ان NCR عکس کلی از
                  </label>
                  <FileInput files={NCR} onChange={setNCR} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس کلی از بانک باتری و تکی از باتری
                  </label>
                  <FileInput
                    files={batteryvoltaj}
                    onChange={setBatteryVoltaj}
                  />
                </div>
                {/* Images for Serial Battery  */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس واضع از سریال های باتری
                  </label>
                  <FileInput
                    files={batteryserial}
                    onChange={setBatterySerial}
                  />
                </div>
                {/* Images for Serial Battery  */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    ولتاژ باتری + لود سایت
                  </label>
                  <FileInput files={loadsite} onChange={setLoadSite} />
                </div>
                {/* Images for Battery Fields */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    قطع فیلد های باتری
                  </label>
                  <FileInput
                    files={batteryfields}
                    onChange={setBatteryFields}
                  />
                </div>

                {/* Images for Voltaj Strink */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس ولتاژ گیری از دوسر هر استرینک و سل به سل تمام باتری ها
                  </label>
                  <FileInput files={voltajstrink} onChange={setVoltajstrink} />
                </div>

                {/* Images for Fioz Battery */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    وصل فیوز باتری و قطع فیوز التک
                  </label>
                  <FileInput files={fiozbattery} onChange={setFiozbattery} />
                </div>

                {/* Images for OM */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (0 min) بلا فاصله بعد از قطع برق شروع به اندازه گیری ولتاژ
                    ها کنید
                  </label>
                  <FileInput files={om} onChange={setOm} />
                </div>

                {/* Images for 20M */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (20 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری ها
                    تست بگیرید
                  </label>
                  <FileInput files={twentym} onChange={setTwentym} />
                </div>

                {/* Images for 40M */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (40 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری ها
                    تست بگیرید
                  </label>
                  <FileInput files={fortym} onChange={setFortym} />
                </div>

                {/* Images for 60M */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (60 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری ها
                    تست بگیرید
                  </label>
                  <FileInput files={sixtym} onChange={setSixtym} />
                </div>

                {/* Images for 80M */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (80 min) در صورت سسلامت باتری ها هر 20 دقیقه از تمام باتری
                    ها تست بگیرید
                  </label>
                  <FileInput files={eightym} onChange={setEightym} />
                </div>

                {/* Images for 100M */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (100 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری
                    ها تست بگیرید
                  </label>
                  <FileInput files={onehundredm} onChange={setOneHundredm} />
                </div>

                {/* Images for 120M */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (120 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری
                    ها تست بگیرید
                  </label>
                  <FileInput
                    files={onehundredtwentym}
                    onChange={setOneHundredTwentym}
                  />
                </div>

                {/* Images for Battery Tags */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس از برچسب باتری تست بر روی باتری ها فالت چسبانده شده
                  </label>
                  <FileInput files={batterytags} onChange={setBatteryTags} />
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    className={`bg-gray-600 text-white px-4 py-2 rounded-lg ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
                {isSubmitting && <MyProgressBar progress={progress} />}
              </div>
            </>
          )}

          {/* ScreenShots Form */}
          {selectedCard === "ScreenShots" && (
            <>
              <div>
                <div className="font-sans text-right mb-4">
                  <h2 className="mb-4 px-2 py-3 text-white bg-gray-700 rounded-lg bg-opacity-80 text-center">
                    You are filling information of {siteID} - Nian{" "}
                    {selectedCard}
                  </h2>
                  <label className="block font-semibold mb-2">
                    عکس اکسل ولتاژ های باتری ها
                  </label>
                  <FileInput
                    files={ssexcelvoltaj}
                    onChange={setssexcelvoltaj}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس از اکسل سریال های باتری
                  </label>
                  <FileInput
                    files={batteryserialexcel}
                    onChange={setBatterySerialexcel}
                  />
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    onClick={handleSubmit}
                    className={`bg-gray-800 text-white px-4 py-2 rounded-lg ${
                      isSubmitting || !(ssexcelvoltaj.length > 0)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={isSubmitting || !(ssexcelvoltaj.length > 0)}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
                {isSubmitting && <MyProgressBar progress={progress} />}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NianForm;
