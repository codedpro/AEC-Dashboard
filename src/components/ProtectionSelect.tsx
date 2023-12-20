import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { userService } from "src/services";
import MyProgressBar from "./Progressbar";

interface ImageUploaderProps {
  mwAntSize: string[];
  mwAntSizecondition: string;
  index: number;
  isRigerFormSubmit: boolean;
  siteid: string;
  onProtectionChange: (protection: string, protectionKey: string) => void;
}

const ProtectionSelect: React.FC<ImageUploaderProps> = ({
  mwAntSize,
  mwAntSizecondition,
  index,
  isRigerFormSubmit,
  siteid,
  onProtectionChange,
}) => {
  const [protection, setProtection] = useState<string>("");

  const uniqueSuffix = mwAntSizecondition + " - " + index;
  const [oduImage, setOduImage] = useState<File[]>([]);
  const [serialImage, setSerialImage] = useState<File[]>([]);
  const [isolationImage, setIsolationImage] = useState<File[]>([]);
  const [woundOduImage, setWoundOduImage] = useState<File[]>([]);

  const [oduImage2, setOduImage2] = useState<File[]>([]);
  const [serialImage2, setSerialImage2] = useState<File[]>([]);
  const [isolationImage2, setIsolationImage2] = useState<File[]>([]);
  const [woundOduImage2, setWoundOduImage2] = useState<File[]>([]);

  const [oduImage3, setOduImage3] = useState<File[]>([]);

  const [serialImage3, setSerialImage3] = useState<File[]>([]);
  const [isolationImage3, setIsolationImage3] = useState<File[]>([]);
  const [woundOduImage3, setWoundOduImage3] = useState<File[]>([]);

  const [oduImage4, setOduImage4] = useState<File[]>([]);
  const [serialImage4, setSerialImage4] = useState<File[]>([]);
  const [isolationImage4, setIsolationImage4] = useState<File[]>([]);
  const [woundOduImage4, setWoundOduImage4] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleProtectionChange = (value: string) => {
    setProtection(value);
    onProtectionChange(`protection_${mwAntSizecondition}_${index}`, value);
  };

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
      for (const file of oduImage) {
        formData.append(`oduImage_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of serialImage) {
        formData.append(`serialImage_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of isolationImage) {
        formData.append(`isolationImage_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of woundOduImage) {
        formData.append(`woundOduImage_${mwAntSizecondition}_${index}`, file);
      }

      for (const file of oduImage2) {
        formData.append(`oduImage2_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of serialImage2) {
        formData.append(`serialImage2_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of isolationImage2) {
        formData.append(`isolationImage2_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of woundOduImage2) {
        formData.append(`woundOduImage2_${mwAntSizecondition}_${index}`, file);
      }

      for (const file of oduImage3) {
        formData.append(`oduImage3_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of serialImage3) {
        formData.append(`serialImage3_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of isolationImage3) {
        formData.append(`isolationImage3_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of woundOduImage3) {
        formData.append(`woundOduImage3_${mwAntSizecondition}_${index}`, file);
      }

      for (const file of oduImage4) {
        formData.append(`oduImage4_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of serialImage4) {
        formData.append(`serialImage4_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of isolationImage4) {
        formData.append(`isolationImage4_${mwAntSizecondition}_${index}`, file);
      }
      for (const file of woundOduImage4) {
        formData.append(`woundOduImage4_${mwAntSizecondition}_${index}`, file);
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
        console.log(`Data for index ${index} sent successfully`);
      } else {
        console.error(
          `Error sending data for index ${index}:`,
          response.data.message
        );
      }
    } catch (error) {
      console.error(`Error sending data for index ${index}:`, error.message);
    }
  };

  useEffect(() => {
    if (isRigerFormSubmit) {
      handleSubmit();
    }
  }, [isRigerFormSubmit]);

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-1 ml-1">
        Protection {uniqueSuffix}
      </label>
      {mwAntSize.includes(mwAntSizecondition) && (
        <div className="relative">
          <select
            value={protection}
            onChange={(e) => handleProtectionChange(e.target.value)}
            className="w-full bg-white focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal cursor-pointer"
            required
          >
            <option className="text-gray-700">
              Select Protection {uniqueSuffix}
            </option>
            <option className="text-gray-700">1 + 0</option>
            <option className="text-gray-700">2 + 0</option>
            <option className="text-gray-700">4 + 0</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-700">&#9660;</span>
          </div>
        </div>
      )}

      {mwAntSize.includes(mwAntSizecondition) &&
        (protection === "1 + 0" ||
          protection === "2 + 0" ||
          protection === "4 + 0") && (
          <>
            {/* ODU Image Upload */}
            <ImageUpload
              title={`ODU Image ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setOduImage}
              currentImage={oduImage}
              setCurrentImage={setOduImage}
            />
            {/* Serial Image Upload */}
            <ImageUpload
              title={`Serial Image ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setSerialImage}
              currentImage={serialImage}
              setCurrentImage={setSerialImage}
            />
            {/* Isolation Image Upload */}
            <ImageUpload
              title={`Isolation Image ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setIsolationImage}
              currentImage={isolationImage}
              setCurrentImage={setIsolationImage}
            />
            {/* Wound ODU Image Upload */}
            <ImageUpload
              title={`Wound ODU Image ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setWoundOduImage}
              currentImage={woundOduImage}
              setCurrentImage={setWoundOduImage}
            />
          </>
        )}

      {mwAntSize.includes(mwAntSizecondition) &&
        (protection === "2 + 0" || protection === "4 + 0") && (
          <>
            {/* ODU Image Upload 2 */}
            <ImageUpload
              title={`ODU Image 2 - ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setOduImage2}
              currentImage={oduImage2}
              setCurrentImage={setOduImage2}
            />
            {/* Serial Image Upload 2 */}
            <ImageUpload
              title={`Serial Image 2 - ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setSerialImage2}
              currentImage={serialImage2}
              setCurrentImage={setSerialImage2}
            />
            {/* Isolation Image Upload 2 */}
            <ImageUpload
              title={`Isolation Image 2 - ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setIsolationImage2}
              currentImage={isolationImage2}
              setCurrentImage={setIsolationImage2}
            />
            {/* Wound ODU Image Upload 2 */}
            <ImageUpload
              title={`Wound ODU Image 2 - ${uniqueSuffix}`}
              maxImages={10}
              onImagesUpload={setWoundOduImage2}
              currentImage={woundOduImage2}
              setCurrentImage={setWoundOduImage2}
            />
          </>
        )}

      {mwAntSize.includes(mwAntSizecondition) && protection === "4 + 0" && (
        <>
          {/* ODU Image Upload 3 */}
          <ImageUpload
            title={`ODU Image 3 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setOduImage3}
            currentImage={oduImage3}
            setCurrentImage={setOduImage3}
          />
          {/* Serial Image Upload 3 */}
          <ImageUpload
            title={`Serial Image 3 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setSerialImage3}
            currentImage={serialImage3}
            setCurrentImage={setSerialImage3}
          />
          {/* Isolation Image Upload 3 */}
          <ImageUpload
            title={`Isolation Image 3 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setIsolationImage3}
            currentImage={isolationImage3}
            setCurrentImage={setIsolationImage3}
          />
          {/* Wound ODU Image Upload 3 */}
          <ImageUpload
            title={`Wound ODU Image 3 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setWoundOduImage3}
            currentImage={woundOduImage3}
            setCurrentImage={setWoundOduImage3}
          />
          {/* ODU Image Upload 4 */}
          <ImageUpload
            title={`ODU Image 4 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setOduImage4}
            currentImage={oduImage4}
            setCurrentImage={setOduImage4}
          />
          {/* Serial Image Upload 4 */}
          <ImageUpload
            title={`Serial Image 4 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setSerialImage4}
            currentImage={serialImage4}
            setCurrentImage={setSerialImage4}
          />
          {/* Isolation Image Upload 4 */}
          <ImageUpload
            title={`Isolation Image 4 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setIsolationImage4}
            currentImage={isolationImage4}
            setCurrentImage={setIsolationImage4}
          />
          <ImageUpload
            title={`Wound ODU Image 4 - ${uniqueSuffix}`}
            maxImages={10}
            onImagesUpload={setWoundOduImage4}
            currentImage={woundOduImage4}
            setCurrentImage={setWoundOduImage4}
          />
        </>
      )}
      {isRigerFormSubmit && <MyProgressBar progress={progress} />}
    </>
  );
};

export default ProtectionSelect;
