import React, { useState } from "react";
import axios from "axios";
import FileInput from "./fileinput";
import CongratsPage from "./CongratsPage";
import { userService } from "src/services";
import Card from "./Card";
import MyProgressBar from "./Progressbar";

const BatteryForm: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [siteID, setSiteID] = useState<string>("");
  const [siteidimage, setSiteIdImage] = useState<File[]>([]);
  const [namayePower, setNamayePower] = useState<File[]>([]);
  const [psu, setPsu] = useState<File[]>([]);
  const [kolibatterybank, setKolibatterybank] = useState<File[]>([]);
  const [batteryserial, setBatterySerial] = useState<File[]>([]);
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
          { field: "psu", files: psu },
          { field: "kolibatterybank", files: kolibatterybank },
          { field: "batteryserial", files: batteryserial },
          { field: "batteryvoltaj", files: batteryvoltaj },
          { field: "loadsite", files: loadsite },
          { field: "batteryfields", files: batteryfields },
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
          { field: "ssvoltaj", files: ssvoltaj },
          { field: "sslimit", files: sslimit },
          { field: "ssdekinfire", files: ssdekinfire },
          { field: "ssllvd", files: ssllvd },
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

      const response = await axios.post("/api/battery", formData, config);

      if (response.status === 200) {
        setStep(1);
        setIsSubmitting(false);
        setHasSubmitted(true);
        setSiteIdImage([]);
        setNamayePower([]);
        setPsu([]);
        setKolibatterybank([]);
        setBatterySerial([]);
        setBatteryVoltaj([]);
        setLoadSite([]);
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
                  description="Form for Eltek Rack"
                  imageUrl="/assets/img/battery.jpg"
                  backgroundColor="rgb(51,101,138, 0.5)"
                  onCardClick={() => handleCardClick("BatteryForm")}
                />
                <Card
                  title="ScreenShots Form"
                  description="ScreenShots for Eltek"
                  imageUrl="/assets/img/working-remotely-1.jpg"
                  backgroundColor="rgb(51,101,138, 0.5)"
                  onCardClick={() => handleCardClick("ScreenShots")}
                />
              </div>
              <button
                onClick={() => {
                  if (hasSubmitted) {
                    setStep(3);
                  }
                }}
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 ${
                  hasSubmitted ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!hasSubmitted}
              >
                Finish
              </button>
            </div>
          )}
          {selectedCard === "BatteryForm" && (
            <>
              <div className="font-sans text-right">
                <h2 className="mb-4 px-2 py-3 text-white bg-gray-700 rounded-lg bg-opacity-80 text-center">
                  You are filling information of {siteID} - {selectedCard}
                </h2>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس از کد سایت
                  </label>
                  <FileInput files={siteidimage} onChange={setSiteIdImage} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    DCDU عکس از نمای کلی پاور شلف، بانک باتری، سنسور تمپ، اسمارت
                    پک، فیوز
                  </label>
                  <FileInput files={namayePower} onChange={setNamayePower} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (تعداد مشخص باشد) ها PSU عکس کلی از
                  </label>
                  <FileInput files={psu} onChange={setPsu} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس کلی بانک باتری و عکس از نمای نزدیک باتری
                  </label>
                  <FileInput
                    files={kolibatterybank}
                    onChange={setKolibatterybank}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس واضع از تمام سریال های باتری
                  </label>
                  <FileInput
                    files={batteryserial}
                    onChange={setBatterySerial}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس از ولتاژ دو سر باتری و لود مصرفی سایت با ولتیمتر کلمپی
                  </label>
                  <FileInput
                    files={batteryvoltaj}
                    onChange={setBatteryVoltaj}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (مشخص باشد)عکس از لود سایت بر روی اسمارت پک
                  </label>
                  <FileInput files={loadsite} onChange={setLoadSite} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    قطع فیلد های باتری
                  </label>
                  <FileInput
                    files={batteryfields}
                    onChange={setBatteryFields}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس ولتاژ گیری از دوسر هر استرینک و سل به سل تمام باتری ها
                  </label>
                  <FileInput files={voltajstrink} onChange={setVoltajstrink} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    وصل فیوز باتری و قطع فیوز التک
                  </label>
                  <FileInput files={fiozbattery} onChange={setFiozbattery} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (0 min) بلا فاصله بعد از قطع برق شروع به اندازه گیری ولتاژ
                    ها کنید
                  </label>
                  <FileInput files={om} onChange={setOm} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (20 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری ها
                    تست بگیرید
                  </label>
                  <FileInput files={twentym} onChange={setTwentym} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (40 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری ها
                    تست بگیرید
                  </label>
                  <FileInput files={fortym} onChange={setFortym} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (60 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری ها
                    تست بگیرید
                  </label>
                  <FileInput files={sixtym} onChange={setSixtym} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (80 min) در صورت سسلامت باتری ها هر 20 دقیقه از تمام باتری
                    ها تست بگیرید
                  </label>
                  <FileInput files={eightym} onChange={setEightym} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    (100 min) در صورت سلامت باتری ها هر 20 دقیقه از تمام باتری
                    ها تست بگیرید
                  </label>
                  <FileInput files={onehundredm} onChange={setOneHundredm} />
                </div>

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
                      isSubmitting || !(siteidimage.length > 0)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={isSubmitting || !(siteidimage.length > 0)}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
                {isSubmitting && <MyProgressBar progress={progress} />}
              </div>
            </>
          )}
          {selectedCard === "ScreenShots" && (
            <>
              <div className="font-sans text-right">
                <h2 className=" mb-4 px-2 py-3 text-white bg-gray-700 rounded-lg bg-opacity-80 text-center">
                  You are filling information of {siteID} - {selectedCard}
                </h2>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    اسکرین شات از سیستم ولتاژ
                  </label>
                  <FileInput files={ssvoltaj} onChange={setssvoltaj} />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    اسکرین شات از کارتن لیمیت
                  </label>
                  <FileInput files={sslimit} onChange={setsslimit} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    اسکرین شات از صفحه رکتیفایر ها
                  </label>
                  <FileInput files={ssdekinfire} onChange={setssdekinfire} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    LLVD اسکرین شات از صفحه
                  </label>
                  <FileInput files={ssllvd} onChange={setssllvd} />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2">
                    عکس اکسل ولتاژ های باتری ها
                  </label>
                  <FileInput
                    files={ssexcelvoltaj}
                    onChange={setssexcelvoltaj}
                  />
                </div>
                <div>
                  <button
                    onClick={handleSubmit}
                    className={`bg-gray-800 text-white px-4 py-2 rounded-lg ${
                      isSubmitting ||
                      !(
                        ssvoltaj.length > 0 &&
                        sslimit.length > 0 &&
                        ssdekinfire.length > 0 &&
                        ssllvd.length > 0 &&
                        ssexcelvoltaj.length > 0
                      )
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      isSubmitting ||
                      !(
                        ssvoltaj.length > 0 &&
                        sslimit.length > 0 &&
                        ssdekinfire.length > 0 &&
                        ssllvd.length > 0 &&
                        ssexcelvoltaj.length > 0
                      )
                    }
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

export default BatteryForm;
