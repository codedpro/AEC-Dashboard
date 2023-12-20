import React, { useState } from "react";
import axios from "axios";
import FileInput from "./fileinput";
import CongratsPage from "./CongratsPage";
import { userService } from "src/services";
import Card from "./Card";
import MyProgressBar from "./Progressbar";
import { motion } from "framer-motion";

const CMForm: React.FC = () => {
  const [siteID, setSiteID] = useState<string>("");
  const [beforework, setBeforeWork] = useState<File[]>([]);
  const [working, setWorking] = useState<File[]>([]);
  const [afterwork, setAfterWork] = useState<File[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const firstName = userService.getFirstName();
  const lastName = userService.getLastName();
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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

      if (selectedCard === "beforework" && beforework.length > 0) {
        for (const file of beforework) {
          formData.append("beforework", file);
        }
      }
      if (selectedCard === "working" && working.length > 0) {
        for (const file of working) {
          formData.append("working", file);
        }
      }
      if (selectedCard === "afterwork" && afterwork.length > 0) {
        for (const file of afterwork) {
          formData.append("afterwork", file);
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

      const response = await axios.post("/api/cm", formData, config);

      if (response.status === 200) {
        setStep(1);
        setIsSubmitting(false);
        setHasSubmitted(true);
        setBeforeWork([]);
        setWorking([]);
        setAfterWork([]);
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
  const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  });
  return (
    <div className="container mt-5 inherit2 ">
      {step === 3 ? (
        <CongratsPage
          text="Congratulations! Your CM Form has been submitted."
          backgroundColor="rgb(63, 81, 181)"
          textColor="white"
          confettiColors={["#FF5733", "#33FF57", "#5733FF", "#FFFF33"]}
          numberOfConfetti={400}
          redirectTo="/CM"
        />
      ) : (
        <>
          {step === 0 && (
            <div>
              <motion.h1
                className="text-4xl font-bold mb-4"
                initial="hidden"
                animate="show"
                variants={fadeIn("up", "spring", 0.5, 0.5)}
              >
                CM Report
              </motion.h1>{" "}
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn("up", "spring", 0.2, 0.5)}
              >
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
                    className={`bg-gray-800 text-white px-4 py-2 rounded-lg ml-2 ${
                      siteID.trim() === ""
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={siteID.trim() === ""}
                  >
                    Enter
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {step === 1 && (
            <div className="inherit2">
              <h2 className="text-xl mb-4">Choose your form for {siteID}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                <Card
                  title="Before Work"
                  description="Description for before work"
                  imageUrl="/assets/img/bwaytower_04.jpg"
                  backgroundColor="rgba(255, 0, 0, 0.5)"
                  onCardClick={() => handleCardClick("beforework")}
                />
                <Card
                  title="Working"
                  description="Description for working"
                  imageUrl="/assets/img/shutterstock_340257473.jpg"
                  backgroundColor="rgba(0, 255, 0, 0.5)"
                  onCardClick={() => handleCardClick("working")}
                />
                <Card
                  title="After Work"
                  description="Description for after work"
                  imageUrl="/assets/img/1_kADFZSQLmJO3i3gvxcjmMg.jpg"
                  backgroundColor="rgba(0, 0, 255, 0.5)"
                  onCardClick={() => handleCardClick("afterwork")}
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

          {step === 2 && (
            <div className="font-sans">
              <h2 className=" mb-4 px-2 py-3 text-white bg-gray-700 rounded-lg bg-opacity-80">
                You are filling information of {siteID} - {selectedCard}
              </h2>

              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Images for {selectedCard}
                </label>
                <FileInput
                  files={
                    selectedCard === "beforework"
                      ? beforework
                      : selectedCard === "working"
                      ? working
                      : afterwork
                  }
                  onChange={(files) => {
                    if (selectedCard === "beforework") {
                      setBeforeWork(files);
                    } else if (selectedCard === "working") {
                      setWorking(files);
                    } else {
                      setAfterWork(files);
                    }
                  }}
                />
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className={`bg-gray-800 text-white px-4 py-2 rounded-lg ${
                    isSubmitting ||
                    !(
                      selectedCard &&
                      ((selectedCard === "beforework" &&
                        beforework.length > 0) ||
                        (selectedCard === "working" && working.length > 0) ||
                        (selectedCard === "afterwork" && afterwork.length > 0))
                    )
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    isSubmitting ||
                    !(
                      selectedCard &&
                      ((selectedCard === "beforework" &&
                        beforework.length > 0) ||
                        (selectedCard === "working" && working.length > 0) ||
                        (selectedCard === "afterwork" && afterwork.length > 0))
                    )
                  }
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {isSubmitting && <MyProgressBar progress={progress} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CMForm;
