import React, { useState, useEffect } from "react";
import axios from "axios";
import FileInput from "./fileinput";
import { motion } from "framer-motion";
import { userService } from "src/services";
import CongratsPage from "./CongratsPage";
import MyProgressBar from "./Progressbar";
import { useInView } from "react-intersection-observer"; 

const VandalismForm: React.FC = () => {
  const [siteID, setSiteID] = useState<string>("");
  const [siteImages, setSiteImages] = useState<File[]>([]);
  const [environmentImages, setEnvironmentImages] = useState<File[]>([]);
  const [roadImages, setRoadImages] = useState<File[]>([]);
  const [racksImages, setRacksImages] = useState<File[]>([]);
  const [vandalismImages, setVandalismImages] = useState<File[]>([]);
  const [lockImage, setLockImage] = useState<File[]>([]);
  const [policeReportImage, setPoliceReportImage] = useState<File[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const firstName = userService.getFirstName();
  const lastName = userService.getLastName();
  const [showCongratsPage, setShowCongratsPage] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const inputsFilled =
      siteID !== "" &&
      siteImages.length > 0 &&
      environmentImages.length > 0 &&
      roadImages.length > 0 &&
      racksImages.length > 0 &&
      vandalismImages.length > 0 &&
      lockImage.length > 0 &&
      policeReportImage.length > 0 &&
      comment !== "";

    setIsFormValid(inputsFilled);
  }, [
    siteID,
    siteImages,
    environmentImages,
    roadImages,
    racksImages,
    vandalismImages,
    lockImage,
    policeReportImage,
    comment,
  ]);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("siteID", siteID);
      formData.append(
        "username",
        userService.getFirstName() + " " + userService.getLastName()
      );
      console.log(
        "Username:",
        userService.getFirstName() + " " + userService.getLastName()
      );

      for (const file of siteImages) {
        formData.append("siteImages", file);
      }

      for (const file of environmentImages) {
        formData.append("environmentImages", file);
      }

      for (const file of roadImages) {
        formData.append("roadImages", file);
      }

      for (const file of racksImages) {
        formData.append("racksImages", file);
      }

      for (const file of vandalismImages) {
        formData.append("vandalismImages", file);
      }

      for (const file of lockImage) {
        formData.append("lockImage", file);
      }

      for (const file of policeReportImage) {
        formData.append("policeReportImage", file);
      }

      formData.append("comment", comment);

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

      const response = await axios.post("/api/vandalism", formData, config);

      if (response.status === 200) {
        setSiteID("");
        setSiteImages([]);
        setEnvironmentImages([]);
        setRoadImages([]);
        setRacksImages([]);
        setVandalismImages([]);
        setLockImage([]);
        setPoliceReportImage([]);
        setComment("");
        setShowCongratsPage(true);
        setIsSubmitting(false);
      } else {
        console.error("Error submitting form:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  const useInViewFade = (direction, type, delay, duration) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
    });
  
    const variants = {
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
    };
  
    return [ref, inView ? "show" : "hidden", variants];
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
    <motion.div
      className="container mt-5"
      initial="hidden"
      animate="show"
      variants={fadeIn("up", "spring", 0.5, 0.5)}
    >
      {showCongratsPage ? (
        <CongratsPage
          text="Congratulations! Your Vandalism Form has been submitted."
          backgroundColor="rgb(63, 81, 181)"
          textColor="white"
          confettiColors={["#FF5733", "#33FF57", "#5733FF", "#FFFF33"]}
          numberOfConfetti={400}
          redirectTo="/Vandalism"
        />
      ) : (
        <>
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 0.5, 0.5)}
          >
            Vandalism Report
          </motion.h1>

          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 0.2, 0.5)}
          >
            <label htmlFor="siteID" className="block font-semibold mb-2">
              Site ID:
            </label>
            <input
              type="text"
              id="siteID"
              value={siteID}
              onChange={(e) => setSiteID(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
              placeholder="Site ID"
            />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 0.9, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Images for Site ID
            </label>
            <FileInput files={siteImages} onChange={setSiteImages} />
          </motion.div>

          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 1.1, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Images of the Site Environment
            </label>
            <FileInput
              files={environmentImages}
              onChange={setEnvironmentImages}
            />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 1.3, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Images of Road to the Site
            </label>
            <FileInput files={roadImages} onChange={setRoadImages} />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 1.5, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Images of Racks of the Site
            </label>
            <FileInput files={racksImages} onChange={setRacksImages} />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 1.7, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Images of Vandalism Items
            </label>
            <FileInput files={vandalismImages} onChange={setVandalismImages} />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 1.9, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Image of Lock of the Site
            </label>
            <FileInput files={lockImage} onChange={setLockImage} />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 2.1, 0.5)}
          >
            <label className="block font-semibold mb-2">
              Image of Police Report
            </label>
            <FileInput
              files={policeReportImage}
              onChange={setPoliceReportImage}
            />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 2.3, 0.5)}
          >
            <label htmlFor="comment" className="block font-semibold mb-2">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
              placeholder="Comment"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "spring", 2.5, 0.5)}
          >
            <button
              onClick={handleSubmit}
              className={`bg-gray-800 text-white px-4 py-2 rounded-lg ${
                isFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </motion.div>
          {isSubmitting && <MyProgressBar progress={progress} />}
        </>
      )}
    </motion.div>
  );
};

export default VandalismForm;
