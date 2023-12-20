import React, { useEffect, useState } from "react";
import axios from "axios";
import path from "path";
import Image from "next/image";
import CongratsPage from "./CongratsPage";
import { userService } from "src/services";
import MyProgressBar from "./Progressbar";
const DynamicForm = () => {
  const TOTAL_PAGES = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [issubmited, setissubmited] = useState<boolean>(false);
  const [siteId, setSiteId] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [siteType, setSiteType] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageST, setImageST] = useState<File | null>(null);
  const [batteryType, setBatteryType] = useState<string>("");
  const [TDD, setTDD] = useState<string>("");
  const [PowerRactType, setPowerRactType] = useState<string>("");
  const [RackType, setRackType] = useState<string>("");
  const [RackTypeFile, setRackTypeFile] = useState<File | null>(null);
  const [RackTypeFilePreview, setRackTypeFilePreview] = useState<string | null>(
    null
  );
  const [BatteryQTY, setBatteryQTY] = useState<string>("");
  const [BBTime, setBBTime] = useState<string>("");
  const [BBcapacity, setBBCapacity] = useState<number | null>(null);
  const [RectifireType, setRectifireType] = useState<string>("");
  const [RectifireQTY, setRectifireQTY] = useState<number | null>(null);
  const [RectifireCapacity, setRectifireCapacity] = useState<number | null>(
    null
  );
  const [Security, setSecuity] = useState<string>("");
  const [SecurityType, setSecuityType] = useState<string>("");
  const [Mesh, setMesh] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const [imageTDD, setImageTDD] = useState<File | null>(null);
  const [imagePRT, setImagePRT] = useState<File | null>(null);
  const [imageBT, setImageBT] = useState<File | null>(null);
  const [imageRT, setImageRT] = useState<File | null>(null);
  const [imageS, setImageS] = useState<File | null>(null);
  const [imageM, setImageM] = useState<File | null>(null);
  const [imageTDDPreview, setImageTDDPreview] = useState<string | null>(null);
  const [imagePRTPreview, setImagePRTPreview] = useState<string | null>(null);
  const [imageBTPreview, setImageBTPreview] = useState<string | null>(null);
  const [imageRTPreview, setImageRTPreview] = useState<string | null>(null);
  const [imageSPreview, setImageSPreview] = useState<string | null>(null);
  const [imageMPreview, setImageMPreview] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePreviewST, setImagePreviewST] = useState<string | null>(null);

  const [batteryVoltage, setBatteryVoltage] = useState<number | null>(null);

  //case3
  const [GeSM, setGeSM] = useState<string>("");

  const [GesmRackType, setGesmRackType] = useState<string>("");
  const [GesmRackTypeFile, setGesmRackTypeFile] = useState<File | null>(null);
  const [GesmRackTypeFilePreview, setGesmRackTypeFilePreview] = useState<
    string | null
  >(null);

  const [GesmPowerRackType, setGesmPowerRackType] = useState<string>("");
  const [GesmPowerRackTypeFile, setGesmPowerRackTypeFile] =
    useState<File | null>(null);
  const [GesmPowerRackTypeFilePreview, setGesmPowerRackTypeFilePreview] =
    useState<string | null>(null);

  const [GesmBatteryType, setGesmBatteryType] = useState<string>("");
  const [GesmBatteryTypeFile, setGesmBatteryTypeFile] = useState<File | null>(
    null
  );
  const [GesmBatteryTypeFilePreview, setGesmBatteryTypeFilePreview] = useState<
    string | null
  >(null);

  const [GesmBatteryQtY, setGesmBatteryQtY] = useState<string>("");

  const [GesmBBTime, setGesmBBTime] = useState<string>("");

  const [GesmBBcapecity, setGesmBBcapecity] = useState<string>("");

  const [GesmRectifierType, setGesmRectifierType] = useState<string>("");
  const [GesmRectifierTypeFile, setGesmRectifierTypeFile] =
    useState<File | null>(null);
  const [GesmRectifierTypeFilePreview, setGesmRectifierTypeFilePreview] =
    useState<string | null>(null);

  const [GesmRectifierQTY, setGesmRectifierQTY] = useState<number | null>(null);

  const [GesmRectifierCapecity, setGesmRectifierCapecity] = useState<
    number | null
  >(null);

  const [GesmSecurity, setGesmSecurity] = useState<string>("");
  const [GesmSecurityFile, setGesmSecurityFile] = useState<File | null>(null);
  const [GesmSecurityFilePreview, setGesmSecurityFilePreview] = useState<
    string | null
  >(null);

  const [GesmSecurityType, setGesmSecurityType] = useState<string>("");

  const [GesmMesh, setGesmMesh] = useState<string>("");
  const [GesmMeshFile, setGesmMeshFile] = useState<File | null>(null);
  const [GesmMeshFilePreview, setGesmMeshFilePreview] = useState<string | null>(
    null
  );

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const startOfYear = new Date(year, 0, 1);
  const daysPassed = Math.floor(
    (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const week = Math.ceil((daysPassed + startOfYear.getDay() + 1) / 7);
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const [isBatteryHealthy, setIsBatteryHealthy] = useState<boolean | null>(
    null
  );
  const [userName, setUserName] = useState<string>("");

  // Page 4
  const [counternoacmeter, setcounternoacmeter] = useState<string>("");
  const [counternoacmeterFile, setcounternoacmeterFile] = useState<File | null>(
    null
  );
  const [counternoacmeterFilePreview, setcounternoacmeterFilePreview] =
    useState<string | null>(null);
  const [acmeterboxlocation, setacmeterboxlocation] = useState<string>("");
  const [acmeterboxlocationFile, setacmeterboxlocationFile] =
    useState<File | null>(null);
  const [acmeterboxlocationFilePreview, setacmeterboxlocationFilePreview] =
    useState<string | null>(null);
  const [ac1A, setac1A] = useState<string>("");
  const [ac2A, setac2A] = useState<string>("");
  const [ac3A, setac3A] = useState<string>("");
  const [Dedicatedtransformer, setDedicatedtransformer] = useState<string>("");
  const [deticatedtransformercapacity, setdeticatedtransformercapacity] =
    useState<string>("");
  //page 5
  const [Fence, setFence] = useState<string>("");

  const [FenceType, setFenceType] = useState<string>("");
  const [FenceTypeFile, setFenceTypeFile] = useState<File | null>(null);
  const [FenceTypeFilePreview, setFenceTypeFilePreview] = useState<
    string | null
  >(null);
  const [Fencegiralock, setFencegiralock] = useState<string>("");

  //page 6
  const [SunShade, setSunShade] = useState<string>("");
  const [SunShadeFile, setSunShadeFile] = useState<File | null>(null);
  const [SunShadeFilePreview, setSunShadeFilePreview] = useState<string | null>(
    null
  );
  const [Share, setShare] = useState<string>("");
  const [HostOperator, setHostOperator] = useState<string>("");
  const [Safe, setSafe] = useState<string>("");

  const [EquipmentfixingType, setEquipmentfixingType] = useState<string>("");
  const [EquipmentfixingTypeFile, setEquipmentfixingTypeFile] =
    useState<File | null>(null);
  const [EquipmentfixingTypeFilePreview, setEquipmentfixingTypeFilePreview] =
    useState<string | null>(null);

  //page 7
  const [TowerType, setTowerType] = useState<string>("");
  const [TowerTypeFile, setTowerTypeFile] = useState<File | null>(null);
  const [TowerTypeFilePreview, setTowerTypeFilePreview] = useState<
    string | null
  >(null);
  const [TowerSupplier, setTowerSupplier] = useState<string>("");
  const [TowerSupplierFile, setTowerSupplierFile] = useState<File | null>(null);
  const [TowerSupplierPreview, setTowerSupplierFilePreview] = useState<
    string | null
  >(null);
  const [TowerHeight, setTowerHeight] = useState<string>("");
  const [FPAmaximumLoading, setFPAmaximumLoading] = useState<string>("");
  //Page 8
  const [OTNTX, setOTNTX] = useState<string>("");

  const [OtnRackType, setOtnRackType] = useState<string>("");
  const [OtnRackTypeFile, setOtnRackTypeFile] = useState<File | null>(null);
  const [OtnRackTypeFilePreview, setOtnRackTypeFilePreview] = useState<
    string | null
  >(null);

  const [OtnPowerRackType, setOtnPowerRackType] = useState<string>("");
  const [OtnPowerRackTypeFile, setOtnPowerRackTypeFile] = useState<File | null>(
    null
  );
  const [OtnPowerRackTypeFilePreview, setOtnPowerRackTypeFilePreview] =
    useState<string | null>(null);

  const [OtnBatteryType, setOtnBatteryType] = useState<string>("");
  const [OtnBatteryTypeFile, setOtnBatteryTypeFile] = useState<File | null>(
    null
  );
  const [OtnBatteryTypeFilePreview, setOtnBatteryTypeFilePreview] = useState<
    string | null
  >(null);

  const [OtnBatteryQtY, setOtnBatteryQtY] = useState<string>("");

  const [OtnBBTime, setOtnBBTime] = useState<string>("");

  const [OtnBBcapecity, setOtnBBcapecity] = useState<string>("");

  const [OtnRectifierType, setOtnRectifierType] = useState<string>("");
  const [OtnRectifierTypeFile, setOtnRectifierTypeFile] = useState<File | null>(
    null
  );
  const [OtnRectifierTypeFilePreview, setOtnRectifierTypeFilePreview] =
    useState<string | null>(null);

  const [OtnRectifierQTY, setOtnRectifierQTY] = useState<string>("");

  const [OtnRectifierCapecity, setOtnRectifierCapecity] = useState<string>("");

  const [OtnSecurity, setOtnSecurity] = useState<string>("");
  const [OtnSecurityFile, setOtnSecurityFile] = useState<File | null>(null);
  const [OtnSecurityFilePreview, setOtnSecurityFilePreview] = useState<
    string | null
  >(null);

  const [OtnSecurityType, setOtnSecurityType] = useState<string>("");

  useEffect(() => {
    if (TowerSupplierFile) {
      const filePreviewUrl = URL.createObjectURL(TowerSupplierFile);
      setTowerSupplierFilePreview(filePreviewUrl);
    } else {
      setTowerSupplierFilePreview(null);
    }
  }, [TowerSupplierFile]);

  useEffect(() => {
    if (TowerTypeFile) {
      const filePreviewUrl = URL.createObjectURL(TowerTypeFile);
      setTowerTypeFilePreview(filePreviewUrl);
    } else {
      setTowerTypeFilePreview(null);
    }
  }, [TowerTypeFile]);

  useEffect(() => {
    if (OtnRackTypeFile) {
      const filePreviewUrl = URL.createObjectURL(OtnRackTypeFile);
      setOtnRackTypeFilePreview(filePreviewUrl);
    } else {
      setOtnRackTypeFilePreview(null);
    }
  }, [OtnRackTypeFile]);

  useEffect(() => {
    if (RackTypeFile) {
      const filePreviewUrl = URL.createObjectURL(RackTypeFile);
      setRackTypeFilePreview(filePreviewUrl);
    } else {
      setRackTypeFilePreview(null);
    }
  }, [RackTypeFile]);

  useEffect(() => {
    if (OtnBatteryTypeFile) {
      const filePreviewUrl = URL.createObjectURL(OtnBatteryTypeFile);
      setOtnBatteryTypeFilePreview(filePreviewUrl);
    } else {
      setOtnBatteryTypeFilePreview(null);
    }
  }, [OtnBatteryTypeFile]);

  useEffect(() => {
    if (OtnRectifierTypeFile) {
      const filePreviewUrl = URL.createObjectURL(OtnRectifierTypeFile);
      setOtnRectifierTypeFilePreview(filePreviewUrl);
    } else {
      setOtnRectifierTypeFilePreview(null);
    }
  }, [OtnRectifierTypeFile]);

  useEffect(() => {
    if (OtnSecurityFile) {
      const filePreviewUrl = URL.createObjectURL(OtnSecurityFile);
      setOtnSecurityFilePreview(filePreviewUrl);
    } else {
      setOtnSecurityFilePreview(null);
    }
  }, [OtnSecurityFile]);

  //
  useEffect(() => {
    if (EquipmentfixingTypeFile) {
      const filePreviewUrl = URL.createObjectURL(EquipmentfixingTypeFile);
      setEquipmentfixingTypeFilePreview(filePreviewUrl);
    } else {
      setEquipmentfixingTypeFilePreview(null);
    }
  }, [EquipmentfixingTypeFile]);

  useEffect(() => {
    if (SunShadeFile) {
      const filePreviewUrl = URL.createObjectURL(SunShadeFile);
      setSunShadeFilePreview(filePreviewUrl);
    } else {
      setSunShadeFilePreview(null);
    }
  }, [SunShadeFile]);

  useEffect(() => {
    if (FenceTypeFile) {
      const filePreviewUrl = URL.createObjectURL(FenceTypeFile);
      setFenceTypeFilePreview(filePreviewUrl);
    } else {
      setFenceTypeFilePreview(null);
    }
  }, [FenceTypeFile]);

  useEffect(() => {
    if (counternoacmeterFile) {
      const filePreviewUrl = URL.createObjectURL(counternoacmeterFile);
      setcounternoacmeterFilePreview(filePreviewUrl);
    } else {
      setcounternoacmeterFilePreview(null);
    }
  }, [counternoacmeterFile]);

  useEffect(() => {
    if (acmeterboxlocationFile) {
      const filePreviewUrl = URL.createObjectURL(acmeterboxlocationFile);
      setacmeterboxlocationFilePreview(filePreviewUrl);
    } else {
      setacmeterboxlocationFilePreview(null);
    }
  }, [acmeterboxlocationFile]);

  useEffect(() => {
    if (GesmRackTypeFile) {
      const filePreviewUrl = URL.createObjectURL(GesmRackTypeFile);
      setGesmRackTypeFilePreview(filePreviewUrl);
    } else {
      setGesmRackTypeFilePreview(null);
    }
  }, [GesmRackTypeFile]);

  useEffect(() => {
    if (GesmPowerRackTypeFile) {
      const filePreviewUrl = URL.createObjectURL(GesmPowerRackTypeFile);
      setGesmPowerRackTypeFilePreview(filePreviewUrl);
    } else {
      setGesmPowerRackTypeFilePreview(null);
    }
  }, [GesmPowerRackTypeFile]);

  useEffect(() => {
    if (GesmBatteryTypeFile) {
      const filePreviewUrl = URL.createObjectURL(GesmBatteryTypeFile);
      setGesmBatteryTypeFilePreview(filePreviewUrl);
    } else {
      setGesmBatteryTypeFilePreview(null);
    }
  }, [GesmBatteryTypeFile]);

  useEffect(() => {
    if (GesmRectifierTypeFile) {
      const filePreviewUrl = URL.createObjectURL(GesmRectifierTypeFile);
      setGesmRectifierTypeFilePreview(filePreviewUrl);
    } else {
      setGesmRectifierTypeFilePreview(null);
    }
  }, [GesmRectifierTypeFile]);

  useEffect(() => {
    if (GesmSecurityFile) {
      const filePreviewUrl = URL.createObjectURL(GesmSecurityFile);
      setGesmSecurityFilePreview(filePreviewUrl);
    } else {
      setGesmSecurityFilePreview(null);
    }
  }, [GesmSecurityFile]);

  useEffect(() => {
    if (GesmMeshFile) {
      const filePreviewUrl = URL.createObjectURL(GesmMeshFile);
      setGesmMeshFilePreview(filePreviewUrl);
    } else {
      setGesmMeshFilePreview(null);
    }
  }, [GesmMeshFile]);

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [image]);
  useEffect(() => {
    if (imageTDD) {
      const imageUrl = URL.createObjectURL(imageTDD);
      setImageTDDPreview(imageUrl);
    } else {
      setImageTDDPreview(null);
    }
  }, [imageTDD]);

  useEffect(() => {
    if (imagePRT) {
      const imageUrl = URL.createObjectURL(imagePRT);
      setImagePRTPreview(imageUrl);
    } else {
      setImagePRTPreview(null);
    }
  }, [imagePRT]);

  useEffect(() => {
    if (imageBT) {
      const imageUrl = URL.createObjectURL(imageBT);
      setImageBTPreview(imageUrl);
    } else {
      setImageBTPreview(null);
    }
  }, [imageBT]);

  useEffect(() => {
    if (imageRT) {
      const imageUrl = URL.createObjectURL(imageRT);
      setImageRTPreview(imageUrl);
    } else {
      setImageRTPreview(null);
    }
  }, [imageRT]);

  useEffect(() => {
    if (imageS) {
      const imageUrl = URL.createObjectURL(imageS);
      setImageSPreview(imageUrl);
    } else {
      setImageSPreview(null);
    }
  }, [imageS]);

  useEffect(() => {
    if (imageM) {
      const imageUrl = URL.createObjectURL(imageM);
      setImageMPreview(imageUrl);
    } else {
      setImageMPreview(null);
    }
  }, [imageM]);

  useEffect(() => {
    if (imageST) {
      const imageUrlST = URL.createObjectURL(imageST);
      setImagePreviewST(imageUrlST);
    } else {
      setImagePreviewST(null);
    }
  }, [imageST]);

  const handleNextPage = async () => {
    if (currentPage === 8) {
      const formData = new FormData();
      if (TDD === "NO") {
        setPowerRactType("");
        setImagePRT(null);
        setRackType("");
        setBatteryType("");
        setImageBT(null);
        setBatteryQTY("");
        setBBTime("");
        setBBCapacity(null);
        setRectifireType("");
        setImageRT(null);
        setRectifireQTY(null);
        setRectifireCapacity(null);
        setSecuity("");
        setImageS(null);
        setSecuityType("");
        setMesh("");
        setImageM(null);
        setRackTypeFile(null);
        if (image) {
          const modifiedImageName = `${siteId}_Site ID_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(image.name)}`;
          formData.append("file", image, modifiedImageName);
        }

        if (imageST) {
          const modifiedImageNameST = `${siteId}_${siteType}_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            imageST.name
          )}`;
          formData.append("fileST", imageST, modifiedImageNameST);
        }
        if (GesmRackTypeFile) {
          const modifiedImageNameGesmRackType = `${siteId}_GesmRackType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmRackTypeFile.name
          )}`;
          formData.append(
            "GesmRackTypeFile",
            GesmRackTypeFile,
            modifiedImageNameGesmRackType
          );
        }
        if (GesmPowerRackTypeFile) {
          const modifiedImageNameGesmPowerRackType = `${siteId}_GesmPowerRackType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmPowerRackTypeFile.name
          )}`;
          formData.append(
            "GesmPowerRackTypeFile",
            GesmPowerRackTypeFile,
            modifiedImageNameGesmPowerRackType
          );
        }
        if (GesmBatteryTypeFile) {
          const modifiedImageNameGesmBatteryType = `${siteId}_GesmBatteryType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmBatteryTypeFile.name
          )}`;
          formData.append(
            "GesmBatteryTypeFile",
            GesmBatteryTypeFile,
            modifiedImageNameGesmBatteryType
          );
        }
        if (GesmRectifierTypeFile) {
          const modifiedImageNameGesmRectifierType = `${siteId}_GesmRectifierType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmRectifierTypeFile.name
          )}`;
          formData.append(
            "GesmRectifierTypeFile",
            GesmRectifierTypeFile,
            modifiedImageNameGesmRectifierType
          );
        }
        if (GesmSecurityFile) {
          const modifiedImageNameGesmSecurity = `${siteId}_GesmSecurity_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmSecurityFile.name
          )}`;
          formData.append(
            "GesmSecurityFile",
            GesmSecurityFile,
            modifiedImageNameGesmSecurity
          );
        }
        if (GesmMeshFile) {
          const modifiedImageNameGesmMesh = `${siteId}_GesmMesh_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmMeshFile.name
          )}`;
          formData.append(
            "GesmMeshFile",
            GesmMeshFile,
            modifiedImageNameGesmMesh
          );
        }
        if (counternoacmeterFile) {
          const modifiedcounternoacmeterFile = `${siteId}_Counter NOAC meter_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            counternoacmeterFile.name
          )}`;
          formData.append(
            "counternoacmeterFile",
            counternoacmeterFile,
            modifiedcounternoacmeterFile
          );
        }
        if (acmeterboxlocationFile) {
          const modifiedacmeterboxlocationFile = `${siteId}_AC Meter box location_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            acmeterboxlocationFile.name
          )}`;
          formData.append(
            "acmeterboxlocationFile",
            acmeterboxlocationFile,
            modifiedacmeterboxlocationFile
          );
        }
        // Modify and append FenceTypeFile
        if (FenceTypeFile) {
          const modifiedFenceTypeFile = `${siteId}_Fence Type File_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            FenceTypeFile.name
          )}`;
          formData.append(
            "FenceTypeFile",
            FenceTypeFile,
            modifiedFenceTypeFile
          );
        }
        if (Fence === "No") {
          setFenceType("");
          setFencegiralock("");
        }
        if (Dedicatedtransformer === "No") {
          setdeticatedtransformercapacity("");
        } // Modify and append
        if (SunShadeFile) {
          const modifiedSunShadeFile = `${siteId}_Sun Shade File_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            SunShadeFile.name
          )}`;
          formData.append("SunShadeFile", SunShadeFile, modifiedSunShadeFile);
        }
        // Modify and append EquipmentfixingTypeFile
        if (EquipmentfixingTypeFile) {
          const modifiedEquipmentfixingTypeFile = `${siteId}_EquipmentfixingTypeFile_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            EquipmentfixingTypeFile.name
          )}`;
          formData.append(
            "EquipmentfixingTypeFile",
            EquipmentfixingTypeFile,
            modifiedEquipmentfixingTypeFile
          );
        }
        // Modify and append OtnRackTypeFile
        if (OTNTX === "Yes" && OtnRackTypeFile) {
          const modifiedImageNameOtnRackType = `${siteId}_OtnRackType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            OtnRackTypeFile.name
          )}`;
          formData.append(
            "OtnRackTypeFile",
            OtnRackTypeFile,
            modifiedImageNameOtnRackType
          );
        }
        // Modify and append OtnRectifierTypeFile
        if (OTNTX === "Yes" && OtnRectifierTypeFile) {
          const modifiedImageNameOtnRectifierType = `${siteId}_OtnRectifierType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            OtnRectifierTypeFile.name
          )}`;
          formData.append(
            "OtnRectifierTypeFile",
            OtnRectifierTypeFile,
            modifiedImageNameOtnRectifierType
          );
        }

        // Modify and append OtnSecurityFile

        if (OTNTX === "Yes" && OtnSecurityFile) {
          const modifiedImageNameOtnSecurity = `${siteId}_OtnSecurity_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            OtnSecurityFile.name
          )}`;
          formData.append(
            "OtnSecurityFile",
            OtnSecurityFile,
            modifiedImageNameOtnSecurity
          );
        }
        if (OTNTX === "No") {
          setOtnRackType("");
          setOtnBatteryType("");
          setOtnBatteryQtY("");
          setOtnBBTime("");
          setOtnBBcapecity("");
          setOtnRectifierType("");
          setOtnRectifierQTY("");
          setOtnRectifierCapecity("");
          setOtnSecurity("");
          setOtnSecurityType("");
        }
        // Modify and append TowerTypeFile
        if (TowerTypeFile) {
          const modifiedImageNameTowerTypeFile = `${siteId}_TowerTypeFile_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            TowerTypeFile.name
          )}`;
          formData.append(
            "TowerTypeFile",
            TowerTypeFile,
            modifiedImageNameTowerTypeFile
          );
        }
        // Modify and append TowerSupplierFile
        if (TowerSupplierFile) {
          const modifiedImageNameTowerSupplierFile = `${siteId}_TowerSupplier_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            TowerSupplierFile.name
          )}`;
          formData.append(
            "TowerSupplierFile",
            TowerSupplierFile,
            modifiedImageNameTowerSupplierFile
          );
        }
      } else if (TDD === "YES") {
        // Modify and append GesmRackTypeFile
        if (GesmRackTypeFile) {
          const modifiedImageNameGesmRackType = `${siteId}_GesmRackType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmRackTypeFile.name
          )}`;
          formData.append(
            "GesmRackTypeFile",
            GesmRackTypeFile,
            modifiedImageNameGesmRackType
          );
        }
        // Modify and append GesmPowerRackTypeFile
        if (GesmPowerRackTypeFile) {
          const modifiedImageNameGesmPowerRackType = `${siteId}_GesmPowerRackType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmPowerRackTypeFile.name
          )}`;
          formData.append(
            "GesmPowerRackTypeFile",
            GesmPowerRackTypeFile,
            modifiedImageNameGesmPowerRackType
          );
        }
        // Modify and append GesmBatteryTypeFile
        if (GesmBatteryTypeFile) {
          const modifiedImageNameGesmBatteryType = `${siteId}_GesmBatteryType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmBatteryTypeFile.name
          )}`;
          formData.append(
            "GesmBatteryTypeFile",
            GesmBatteryTypeFile,
            modifiedImageNameGesmBatteryType
          );
        }
        // Modify and append GesmRectifierTypeFile
        if (GesmRectifierTypeFile) {
          const modifiedImageNameGesmRectifierType = `${siteId}_GesmRectifierType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmRectifierTypeFile.name
          )}`;
          formData.append(
            "GesmRectifierTypeFile",
            GesmRectifierTypeFile,
            modifiedImageNameGesmRectifierType
          );
        }
        // Modify and append GesmSecurityFile
        if (GesmSecurityFile) {
          const modifiedImageNameGesmSecurity = `${siteId}_GesmSecurity_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmSecurityFile.name
          )}`;
          formData.append(
            "GesmSecurityFile",
            GesmSecurityFile,
            modifiedImageNameGesmSecurity
          );
        }
        // Modify and append GesmMeshFile
        if (GesmMeshFile) {
          const modifiedImageNameGesmMesh = `${siteId}_GesmMesh_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            GesmMeshFile.name
          )}`;
          formData.append(
            "GesmMeshFile",
            GesmMeshFile,
            modifiedImageNameGesmMesh
          );
        }
        // Modify and append counternoacmeterFile
        if (counternoacmeterFile) {
          const modifiedcounternoacmeterFile = `${siteId}_Counter NOAC meter_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            counternoacmeterFile.name
          )}`;
          formData.append(
            "counternoacmeterFile",
            counternoacmeterFile,
            modifiedcounternoacmeterFile
          );
        }
        // Modify and append acmeterboxlocationFile
        if (acmeterboxlocationFile) {
          const modifiedacmeterboxlocationFile = `${siteId}_AC Meter box location_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            acmeterboxlocationFile.name
          )}`;
          formData.append(
            "acmeterboxlocationFile",
            acmeterboxlocationFile,
            modifiedacmeterboxlocationFile
          );
        }
        // Modify and append FenceTypeFile
        if (FenceTypeFile) {
          const modifiedFenceTypeFile = `${siteId}_Fence Type File_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            FenceTypeFile.name
          )}`;
          formData.append(
            "FenceTypeFile",
            FenceTypeFile,
            modifiedFenceTypeFile
          );
        }
        if (Fence === "No") {
          setFenceType("");
          setFencegiralock("");
        }
        if (Dedicatedtransformer === "No") {
          setdeticatedtransformercapacity("");
        } // Modify and append
        if (SunShadeFile) {
          const modifiedSunShadeFile = `${siteId}_Sun Shade File_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            SunShadeFile.name
          )}`;
          formData.append("SunShadeFile", SunShadeFile, modifiedSunShadeFile);
        }
        // Modify and append EquipmentfixingTypeFile
        if (EquipmentfixingTypeFile) {
          const modifiedEquipmentfixingTypeFile = `${siteId}_EquipmentfixingTypeFile_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            EquipmentfixingTypeFile.name
          )}`;
          formData.append(
            "EquipmentfixingTypeFile",
            EquipmentfixingTypeFile,
            modifiedEquipmentfixingTypeFile
          );
        }
        // Modify and append OtnRackTypeFile
        if (OTNTX === "Yes" && OtnRackTypeFile) {
          const modifiedImageNameOtnRackType = `${siteId}_OtnRackType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            OtnRackTypeFile.name
          )}`;
          formData.append(
            "OtnRackTypeFile",
            OtnRackTypeFile,
            modifiedImageNameOtnRackType
          );
        }
        // Modify and append OtnRectifierTypeFile
        if (OTNTX === "Yes" && OtnRectifierTypeFile) {
          const modifiedImageNameOtnRectifierType = `${siteId}_OtnRectifierType_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            OtnRectifierTypeFile.name
          )}`;
          formData.append(
            "OtnRectifierTypeFile",
            OtnRectifierTypeFile,
            modifiedImageNameOtnRectifierType
          );
        }

        // Modify and append OtnSecurityFile

        if (OTNTX === "Yes" && OtnSecurityFile) {
          const modifiedImageNameOtnSecurity = `${siteId}_OtnSecurity_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            OtnSecurityFile.name
          )}`;
          formData.append(
            "OtnSecurityFile",
            OtnSecurityFile,
            modifiedImageNameOtnSecurity
          );
        }
        if (OTNTX === "No") {
          setOtnRackType("");
          setOtnBatteryType("");
          setOtnBatteryQtY("");
          setOtnBBTime("");
          setOtnBBcapecity("");
          setOtnRectifierType("");
          setOtnRectifierQTY("");
          setOtnRectifierCapecity("");
          setOtnSecurity("");
          setOtnSecurityType("");
        }
        // Modify and append TowerTypeFile
        if (TowerTypeFile) {
          const modifiedImageNameTowerTypeFile = `${siteId}_TowerTypeFile_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            TowerTypeFile.name
          )}`;
          formData.append(
            "TowerTypeFile",
            TowerTypeFile,
            modifiedImageNameTowerTypeFile
          );
        }
        // Modify and append TowerSupplierFile
        if (TowerSupplierFile) {
          const modifiedImageNameTowerSupplierFile = `${siteId}_TowerSupplier_${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            TowerSupplierFile.name
          )}`;
          formData.append(
            "TowerSupplierFile",
            TowerSupplierFile,
            modifiedImageNameTowerSupplierFile
          );
        }
        if (image) {
          const modifiedImageName = `${siteId}_Site ID_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(image.name)}`;
          formData.append("file", image, modifiedImageName);
        }

        if (imageST) {
          const modifiedImageNameST = `${siteId}_${siteType}_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            imageST.name
          )}`;
          formData.append("fileST", imageST, modifiedImageNameST);
        }

        if (imageTDD) {
          const modifiedImageNameTDD = `${siteId}_TDD_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            imageTDD.name
          )}`;
          formData.append("fileTDD", imageTDD, modifiedImageNameTDD);
        }

        if (imagePRT) {
          const modifiedImageNamePRT = `${siteId}_Power Ract Type_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            imagePRT.name
          )}`;
          formData.append("filePRT", imagePRT, modifiedImageNamePRT);
        }

        if (imageBT) {
          const modifiedImageNameBT = `${siteId}_Battery Type_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            imageBT.name
          )}`;
          formData.append("fileBT", imageBT, modifiedImageNameBT);
        }

        if (imageRT) {
          const modifiedImageNameRT = `${siteId}_Reactifire Type_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(
            imageRT.name
          )}`;
          formData.append("fileRT", imageRT, modifiedImageNameRT);
        }

        if (imageS) {
          const modifiedImageNameS = `${siteId}_Security_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(imageS.name)}`;
          formData.append("fileS", imageS, modifiedImageNameS);
        }

        if (imageM) {
          const modifiedImageNameM = `${siteId}_Mesh_${year}-${
            currentDate.getMonth() + 1
          }-${day}_${hours}-${minutes}-${seconds}_${path.extname(imageM.name)}`;
          formData.append("fileM", imageM, modifiedImageNameM);
        }
      }
      try {
        const response = await axios.post("/api/upload-media", formData, {
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

        console.log("Upload successful:", response.data.message);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
    if (currentPage === TOTAL_PAGES) {
      try {
        setUserName(userService.getFirstName + " " + userService.getLastName);
        const response = await axios.post("/api/submit-form", {
          siteId,
          city,
          siteType,
          userName,
          TDD,
          PowerRactType,
          RackType,
          BatteryQTY,
          BBTime,
          BBcapacity,
          RectifireType,
          RectifireQTY,
          RectifireCapacity,
          Security,
          SecurityType,
          Mesh,
          GesmRackType,
          GesmPowerRackType,
          GesmBatteryType,
          GesmBatteryQtY,
          GesmBBTime,
          GesmBBcapecity,
          GesmRectifierType,
          GesmRectifierQTY,
          GesmRectifierCapecity,
          GesmSecurity,
          GesmSecurityType,
          GesmMesh,
          //page4
          counternoacmeter,
          acmeterboxlocation,
          ac1A,
          ac2A,
          ac3A,
          Dedicatedtransformer,
          deticatedtransformercapacity,
          //page5
          Fence,
          FenceType,
          Fencegiralock,
          //page6
          SunShade,
          Share,
          HostOperator,
          Safe,
          EquipmentfixingType,
          //page7
          TowerType,
          TowerSupplier,
          TowerHeight,
          FPAmaximumLoading,
          //page8
          OTNTX,
          OtnRackType,
          OtnBatteryType,
          OtnBatteryQtY,
          OtnBBTime,
          OtnBBcapecity,
          OtnRectifierType,
          OtnRectifierQTY,
          OtnRectifierCapecity,
          OtnSecurity,
          OtnSecurityType,
        });

        if (response.status === 200) {
        } else {
          console.error("Error submitting form");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="page">
            <div className="flex input-image">
              <input
                type="text"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                placeholder="Site ID"
                className="input-field "
                required
              />

              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="input-field"
            />
            <div className="flex input-image">
              <select
                value={siteType}
                onChange={(e) => setSiteType(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Site Type</option>
                <option value="GreenField">GreenField</option>
                <option value="Rooftop">Rooftop</option>
                <option value="Micro">Micro</option>
                <option value="IBS">IBS</option>
                <option value="COW">COW</option>
              </select>
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageST(e.target.files?.[0] || null)}
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {imagePreviewST && (
              <div className="image-preview">
                <img src={imagePreviewST} alt="Preview" />
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="page">
            <div className="flex input-image">
              <select
                value={TDD}
                onChange={(e) => setTDD(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Does It have TDD ?</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
              {TDD === "YES" && (
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageTDD(e.target.files?.[0] || null)}
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              )}
            </div>

            {imageTDDPreview && TDD === "YES" && (
              <div className="image-preview">
                <img src={imageTDDPreview} alt="Preview" />
              </div>
            )}
            {TDD === "YES" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={RackType}
                  onChange={(e) => setRackType(e.target.value)}
                  placeholder="Rack Type"
                  className="input-field"
                  required
                />
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setRackTypeFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {RackTypeFile && RackTypeFilePreview && TDD === "YES" && (
              <div className="image-preview">
                <img src={RackTypeFilePreview} alt="Preview" />
              </div>
            )}
            {TDD === "YES" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={PowerRactType}
                  onChange={(e) => setPowerRactType(e.target.value)}
                  placeholder="Power Ract Type  "
                  className="input-field "
                  required
                />

                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagePRT(e.target.files?.[0] || null)}
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {TDD === "YES" && imagePRTPreview && (
              <div className="image-preview">
                <img src={imagePRTPreview} alt="Preview" />
              </div>
            )}

            {TDD === "YES" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={batteryType}
                  onChange={(e) => setBatteryType(e.target.value)}
                  placeholder="Battery Type  "
                  className="input-field "
                  required
                />

                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageBT(e.target.files?.[0] || null)}
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {TDD === "YES" && imageBTPreview && (
              <div className="image-preview">
                <img src={imageBTPreview} alt="Preview" />
              </div>
            )}
            {TDD === "YES" && (
              <input
                type="text"
                value={BatteryQTY}
                onChange={(e) => setBatteryQTY(e.target.value)}
                placeholder="Battery QTY "
                className="input-field"
                required
              />
            )}
            {TDD === "YES" && (
              <input
                type="text"
                value={BBTime}
                onChange={(e) => setBBTime(e.target.value)}
                placeholder="Battery Time "
                className="input-field"
                required
              />
            )}
            {TDD === "YES" && (
              <input
                type="number"
                value={BBcapacity !== null ? BBcapacity : ""}
                onChange={(e) => setBBCapacity(e.target.value)}
                placeholder="Battery capacity"
                className="input-field"
              />
            )}
            {TDD === "YES" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={RectifireType}
                  onChange={(e) => setRectifireType(e.target.value)}
                  placeholder="Rectifire Type "
                  className="input-field "
                  required
                />
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageRT(e.target.files?.[0] || null)}
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {TDD === "YES" && imageRTPreview && (
              <div className="image-preview">
                <img src={imageRTPreview} alt="Preview" />
              </div>
            )}
            {TDD === "YES" && (
              <input
                type="number"
                value={RectifireQTY}
                onChange={(e) => setRectifireQTY(e.target.value)}
                placeholder="Rectifire QTY "
                className="input-field"
                required
              />
            )}
            {TDD === "YES" && (
              <input
                type="number"
                value={RectifireCapacity}
                onChange={(e) => setRectifireCapacity(e.target.value)}
                placeholder="Rectifire Capacity "
                className="input-field"
                required
              />
            )}
            {TDD === "YES" && (
              <div className="flex input-image">
                <select
                  value={Security}
                  onChange={(e) => setSecuity(e.target.value)}
                  className="input-field "
                  required
                >
                  <option value="">Does it have Security ?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageS(e.target.files?.[0] || null)}
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {TDD === "YES" && imageSPreview && (
              <div className="image-preview">
                <img src={imageSPreview} alt="Preview" />
              </div>
            )}
            {TDD === "YES" && Security === "Yes" && (
              <select
                value={SecurityType}
                onChange={(e) => setSecuityType(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Security Type</option>
                <option value="Belt Type A">Belt Type A</option>
                <option value="Belt type B">Belt type B</option>
                <option value="Belt">Belt</option>
                <option value="Cage">Cage</option>
                <option value="Smart Cage">Smart Cage</option>
              </select>
            )}
            {TDD === "YES" && (
              <div className="flex input-image">
                <select
                  value={Mesh}
                  onChange={(e) => setMesh(e.target.value)}
                  className="input-field "
                  required
                >
                  <option value="">Does it have mesh ?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageM(e.target.files?.[0] || null)}
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {TDD === "YES" && imageMPreview && (
              <div className="image-preview">
                <img src={imageMPreview} alt="Preview" />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="page">
            <h1 className="text-black text-center text-bold text-xl">GSM</h1>

            <div className="flex input-image">
              <input
                type="text"
                value={GesmRackType}
                onChange={(e) => setGesmRackType(e.target.value)}
                placeholder="Rack Type"
                className="input-field"
                required
              />
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGesmRackTypeFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {GesmRackTypeFile && GesmRackTypeFilePreview && (
              <div className="image-preview">
                <img src={GesmRackTypeFilePreview} alt="Preview" />
              </div>
            )}

            <div className="flex input-image">
              <input
                type="text"
                value={GesmPowerRackType}
                onChange={(e) => setGesmPowerRackType(e.target.value)}
                placeholder="Power Rack Type"
                className="input-field"
                required
              />
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGesmPowerRackTypeFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {GesmPowerRackTypeFile && GesmPowerRackTypeFilePreview && (
              <div className="image-preview">
                <img src={GesmPowerRackTypeFilePreview} alt="Preview" />
              </div>
            )}

            <div className="flex input-image">
              <input
                type="text"
                value={GesmBatteryType}
                onChange={(e) => setGesmBatteryType(e.target.value)}
                placeholder="Battery Type"
                className="input-field"
                required
              />
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGesmBatteryTypeFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {GesmBatteryTypeFile && GesmBatteryTypeFilePreview && (
              <div className="image-preview">
                <img src={GesmBatteryTypeFilePreview} alt="Preview" />
              </div>
            )}
            <div className="flex input-image">
              <input
                type="text"
                value={GesmBatteryQtY}
                onChange={(e) => setGesmBatteryQtY(e.target.value)}
                placeholder="Battery Quantity"
                className="input-field"
                required
              />
            </div>

            <div className="flex input-image">
              <input
                type="text"
                value={GesmBBTime}
                onChange={(e) => setGesmBBTime(e.target.value)}
                placeholder="Battery Time"
                className="input-field"
                required
              />
            </div>

            <div className="flex input-image">
              <input
                type="text"
                value={GesmBBcapecity}
                onChange={(e) => setGesmBBcapecity(e.target.value)}
                placeholder="Battery Capacity"
                className="input-field"
                required
              />
            </div>

            <div className="flex input-image">
              <input
                type="text"
                value={GesmRectifierType}
                onChange={(e) => setGesmRectifierType(e.target.value)}
                placeholder="Rectifier Type"
                className="input-field"
                required
              />
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGesmRectifierTypeFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {GesmRectifierTypeFile && GesmRectifierTypeFilePreview && (
              <div className="image-preview">
                <img src={GesmRectifierTypeFilePreview} alt="Preview" />
              </div>
            )}

            <div className="flex input-image">
              <input
                type="number"
                value={GesmRectifierQTY}
                onChange={(e) => setGesmRectifierQTY(e.target.value)}
                placeholder="Rectifier Quantity"
                className="input-field"
                required
              />
            </div>

            <div className="flex input-image">
              <input
                type="number"
                value={GesmRectifierCapecity}
                onChange={(e) => setGesmRectifierCapecity(e.target.value)}
                placeholder="Rectifier Capacity"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <select
                value={GesmSecurity}
                onChange={(e) => setGesmSecurity(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Does it have Security ?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGesmSecurityFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {GesmSecurityFile && GesmSecurityFilePreview && (
              <div className="image-preview">
                <img src={GesmSecurityFilePreview} alt="Preview" />
              </div>
            )}
            {GesmSecurity === "Yes" && (
              <div className="flex input-image">
                <select
                  value={GesmSecurityType}
                  onChange={(e) => setGesmSecurityType(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Security Type</option>
                  <option value="Belt Type A">Belt Type A</option>
                  <option value="Belt type B">Belt type B</option>
                  <option value="Belt">Belt</option>
                  <option value="Cage">Cage</option>
                  <option value="Smart Cage">Smart Cage</option>
                </select>
              </div>
            )}
            <div className="flex input-image">
              <select
                value={GesmMesh}
                onChange={(e) => setGesmMesh(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Does it have Mesh ?</option>
                <option value="Yes">YES</option>
                <option value="No">NO</option>
              </select>
              {
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setGesmMeshFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              }
            </div>
            {GesmMeshFile && GesmMeshFilePreview && (
              <div className="image-preview">
                <img src={GesmMeshFilePreview} alt="Preview" />
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="page">
            <h1 className="text-black text-xl text-center text-bold">MDB</h1>
            <div className="flex input-image">
              <input
                type="text"
                value={counternoacmeter}
                onChange={(e) => setcounternoacmeter(e.target.value)}
                placeholder="No Ac Meter"
                className="input-field"
                required
              />
              {
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setcounternoacmeterFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              }
            </div>
            {counternoacmeterFile && counternoacmeterFilePreview && (
              <div className="image-preview">
                <img src={counternoacmeterFilePreview} alt="Preview" />
              </div>
            )}

            <div className="flex input-image">
              <select
                value={acmeterboxlocation}
                onChange={(e) => setacmeterboxlocation(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Ac Meter box Location</option>
                <option value="At home">At home</option>
                <option value="in Fence">in Fence</option>
                <option value="in Building">in Building</option>
                <option value="PC Box">PC Box</option>
              </select>
              {
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setacmeterboxlocationFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              }
            </div>
            {acmeterboxlocationFile && counternoacmeterFilePreview && (
              <div className="image-preview">
                <img src={acmeterboxlocationFilePreview} alt="Preview" />
              </div>
            )}
            <div className="flex input-image">
              <input
                type="text"
                value={ac1A}
                onChange={(e) => setac1A(e.target.value)}
                placeholder="Ac consumption phase 1A"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <input
                type="text"
                value={ac2A}
                onChange={(e) => setac2A(e.target.value)}
                placeholder="Ac consumption phase 2A"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <input
                type="text"
                value={ac3A}
                onChange={(e) => setac3A(e.target.value)}
                placeholder="Ac consumption phase 3A"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <select
                value={Dedicatedtransformer}
                onChange={(e) => setDedicatedtransformer(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Dedicated Transformer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {Dedicatedtransformer === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={deticatedtransformercapacity}
                  onChange={(e) =>
                    setdeticatedtransformercapacity(e.target.value)
                  }
                  placeholder="Dedicated transformer capacity"
                  className="input-field"
                  required
                />
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="Page">
            <div className="flex input-image">
              <select
                value={Fence}
                onChange={(e) => setFence(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Does it Have Fence ?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="flex input-image">
              {Fence === "Yes" && (
                <select
                  value={FenceType}
                  onChange={(e) => setFenceType(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Fence Type</option>
                  <option value="Old Fence">Old Fence</option>
                  <option value="Pointed Normal Fence ">
                    Pointed Normal Fence
                  </option>
                  <option value="Galvanized Normal Fence">
                    Galvanized Normal Fence
                  </option>
                  <option value="HSF">HSF</option>
                  <option value="Breack Fence">Breack Fence</option>
                  <option value="Steel Fence">Steel Fence</option>
                </select>
              )}
              {Fence === "Yes" && (
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFenceTypeFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              )}
            </div>
            {Fence === "Yes" && FenceTypeFilePreview && FenceTypeFile && (
              <div className="image-preview">
                <img src={FenceTypeFilePreview} alt="Preview" />
              </div>
            )}
            <div className="flex input-image">
              {Fence === "Yes" && (
                <input
                  type="text"
                  value={Fencegiralock}
                  onChange={(e) => setFencegiralock(e.target.value)}
                  placeholder="Fence Gira lock QTY"
                  className="input-field"
                  required
                />
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="page">
            <div className="flex input-image">
              <select
                value={SunShade}
                onChange={(e) => setSunShade(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Sun Shade</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSunShadeFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              }
            </div>
            {SunShadeFile && SunShadeFilePreview && (
              <div className="image-preview">
                <img src={SunShadeFilePreview} alt="Preview" />
              </div>
            )}
            <div className="flex input-image">
              <input
                type="text"
                value={Share}
                onChange={(e) => setShare(e.target.value)}
                placeholder="Share"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <input
                type="text"
                value={HostOperator}
                onChange={(e) => setHostOperator(e.target.value)}
                placeholder="Host Operation"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <select
                type="text"
                value={Safe}
                onChange={(e) => setSafe(e.target.value)}
                placeholder="safe"
                className="input-field"
                required
              >
                <option value="">Select Safe</option>
                <option value="In Building">In Building</option>
                <option value="At Home">At Home</option>
                <option value="Free Land">Free Land</option>
                <option value="LL Garden">LL Garden</option>
                <option value="MTCP Center">MTCP Center</option>
                <option value="Government Office">Government Office</option>
                <option value="Militery Centers">Militery Centers</option>
              </select>
            </div>
            <div className="flex input-image">
              <select
                value={EquipmentfixingType}
                onChange={(e) => setEquipmentfixingType(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Equipment fixing Type</option>
                <option value="I-Beam">I-Beam</option>
                <option value="Base Frame">Base Frame</option>
                <option value="Boltedon Foundation">Boltedon Foundation</option>
                <option value="On Platform">On Platform</option>
                <option value="mounted in wall">mounted in wall</option>
                <option value="Installed on Tower">Installed on Tower</option>
              </select>
              {
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEquipmentfixingTypeFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              }
            </div>
            {EquipmentfixingTypeFile && EquipmentfixingTypeFilePreview && (
              <div className="image-preview">
                <img src={EquipmentfixingTypeFilePreview} alt="Preview" />
              </div>
            )}
          </div>
        );
      case 7:
        return (
          <div className="page">
            <h1 className="text-black text-center text-bold text-xl">Tower</h1>
            <div className="flex input-image">
              <select
                value={TowerType}
                onChange={(e) => setTowerType(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Tower Type</option>
                <option value="Monopole - Pole">Monopole - Pole</option>
                <option value="Lattice - Platform">Lattice - Platform</option>
                <option value="ICB">ICB</option>
                <option value="WCS">WCS</option>
                <option value="NB - Guide Mast">NB - Guide Mast</option>
              </select>
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setTowerTypeFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {TowerTypeFile && TowerTypeFilePreview && (
              <div className="image-preview">
                <img src={TowerTypeFilePreview} alt="Preview" />
              </div>
            )}
            <div className="flex input-image">
              <input
                type="text"
                value={TowerSupplier}
                onChange={(e) => setTowerSupplier(e.target.value)}
                placeholder="Tower Supplier"
                className="input-field"
                required
              />
              <label className="Site-fileupload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setTowerSupplierFile(e.target.files?.[0] || null)
                  }
                  className="DB-inputimage"
                  required
                />
                Choose File
              </label>
            </div>
            {TowerSupplierFile && TowerSupplierPreview && (
              <div className="image-preview">
                <img src={TowerSupplierPreview} alt="Preview" />
              </div>
            )}
            <div className="flex input-image">
              <input
                type="text"
                value={TowerHeight}
                onChange={(e) => setTowerHeight(e.target.value)}
                placeholder="Tower Height"
                className="input-field"
                required
              />
            </div>
            <div className="flex input-image">
              <input
                type="text"
                value={FPAmaximumLoading}
                onChange={(e) => setFPAmaximumLoading(e.target.value)}
                placeholder="FPA maximum Loading"
                className="input-field"
                required
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div className="page">
            <h1 className="text-black text-center text-bold text-xl">OTN/TX</h1>
            <div className="flex input-image">
              <select
                value={OTNTX}
                onChange={(e) => setOTNTX(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Does it have OTN/TX</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnRackType}
                  onChange={(e) => setOtnRackType(e.target.value)}
                  placeholder="Rack Type"
                  className="input-field"
                  required
                />
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setOtnRackTypeFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {OTNTX === "Yes" && OtnRackTypeFilePreview && OtnRackTypeFile && (
              <div className="image-preview">
                <img src={OtnRackTypeFilePreview} alt="Preview" />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnBatteryType}
                  onChange={(e) => setOtnBatteryType(e.target.value)}
                  placeholder="Battery Type"
                  className="input-field"
                  required
                />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnBBcapecity}
                  onChange={(e) => setOtnBBcapecity(e.target.value)}
                  placeholder="Battery Capecity"
                  className="input-field"
                  required
                />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnBatteryQtY}
                  onChange={(e) => setOtnBatteryQtY(e.target.value)}
                  placeholder="Battery QTY"
                  className="input-field"
                  required
                />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnBBTime}
                  onChange={(e) => setOtnBBTime(e.target.value)}
                  placeholder="Battery Time"
                  className="input-field"
                  required
                />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnRectifierType}
                  onChange={(e) => setOtnRectifierType(e.target.value)}
                  placeholder="Rectifire Type"
                  className="input-field"
                  required
                />
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setOtnRectifierTypeFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {OTNTX === "Yes" &&
              OtnRectifierTypeFilePreview &&
              OtnRectifierTypeFile && (
                <div className="image-preview">
                  <img src={OtnRectifierTypeFilePreview} alt="Preview" />
                </div>
              )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnRectifierQTY}
                  onChange={(e) => setOtnRectifierQTY(e.target.value)}
                  placeholder="Rectifier QTY"
                  className="input-field"
                  required
                />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <input
                  type="text"
                  value={OtnRectifierCapecity}
                  onChange={(e) => setOtnRectifierCapecity(e.target.value)}
                  placeholder="Rectifier Capecity"
                  className="input-field"
                  required
                />
              </div>
            )}
            {OTNTX === "Yes" && (
              <div className="flex input-image">
                <select
                  value={OtnSecurity}
                  onChange={(e) => setOtnSecurity(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Does it have Security ?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label className="Site-fileupload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setOtnSecurityFile(e.target.files?.[0] || null)
                    }
                    className="DB-inputimage"
                    required
                  />
                  Choose File
                </label>
              </div>
            )}
            {OTNTX === "Yes" && OtnSecurityFilePreview && OtnSecurityFile && (
              <div className="image-preview">
                <img src={OtnSecurityFilePreview} alt="Preview" />
              </div>
            )}
            {OTNTX === "Yes" && OtnSecurity === "Yes" && (
              <div className="flex input-image">
                <select
                  value={OtnSecurityType}
                  onChange={(e) => setOtnSecurityType(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select Security Type</option>
                  <option value="Belt Type A">Belt Type A</option>
                  <option value="Belt type B">Belt type B</option>
                  <option value="Belt">Belt</option>
                  <option value="Cage">Cage</option>
                  <option value="Smart Cage">Smart Cage</option>
                </select>
              </div>
            )}
          </div>
        );
      // ... other pages
      default:
        return null;
    }
  };
  const isNextButtonDisabled = () => {
    switch (currentPage) {
      case 1:
        return !siteId || !city || !siteType || !image || !imageST;
      case 2:
        if (TDD === "NO") {
          return false;
        }
        return (
          !PowerRactType ||
          !RackTypeFile ||
          !imagePRT ||
          !TDD ||
          !RackType ||
          !batteryType ||
          !imageBT ||
          !BatteryQTY ||
          !BBTime ||
          !BBcapacity ||
          !RectifireType ||
          !imageRT ||
          RectifireQTY === null ||
          RectifireCapacity === null ||
          !Security ||
          !imageS ||
          !SecurityType ||
          !RackTypeFile ||
          !Mesh ||
          !imageM
        );
      case 3:
        return (
          !GesmRackType ||
          !GesmRackTypeFile ||
          !GesmPowerRackType ||
          !GesmBatteryType ||
          !GesmBatteryQtY ||
          !GesmBBTime ||
          !GesmBBcapecity ||
          !GesmRectifierType ||
          !GesmRectifierTypeFile ||
          GesmRectifierCapecity === null ||
          GesmRectifierCapecity === null ||
          !GesmSecurity ||
          !GesmSecurityFile ||
          !GesmSecurityType ||
          !GesmMesh ||
          !GesmMeshFile
        );
      case 4:
        return (
          !counternoacmeter ||
          !counternoacmeterFile ||
          !acmeterboxlocation ||
          !acmeterboxlocationFile ||
          !ac1A ||
          !ac2A ||
          !ac3A ||
          !Dedicatedtransformer ||
          (Dedicatedtransformer === "Yes" && !deticatedtransformercapacity)
        );
      case 5:
        return (
          !Fence ||
          (Fence === "Yes" &&
            (!FenceType ||
              !FenceTypeFile ||
              !acmeterboxlocationFile ||
              !Fencegiralock))
        );
      case 6:
        return (
          !SunShade ||
          !SunShadeFile ||
          !Share ||
          !HostOperator ||
          !Safe ||
          !EquipmentfixingType ||
          !EquipmentfixingTypeFile
        );
      case 7:
        return (
          !TowerType ||
          !TowerTypeFile ||
          !TowerSupplier ||
          !TowerSupplierFile ||
          !TowerHeight ||
          !FPAmaximumLoading
        );
      case 8:
        if (OTNTX === "No") {
          return false;
        }
        return (
          !OtnRackType ||
          !OtnRackTypeFile ||
          !OtnBatteryType ||
          !OtnBatteryQtY ||
          !OtnBBTime ||
          !OtnBBcapecity ||
          !OtnRectifierType ||
          !OtnRectifierTypeFile ||
          !OtnRectifierCapecity ||
          !OtnRectifierQTY ||
          !OtnSecurity ||
          !OtnSecurityFile ||
          !OtnSecurityType ||
          !OTNTX
        );
      default:
        return false;
    }
  };

  const isSubmitButtonDisabled = () => {
    if (OTNTX === "No") {
      return false;
    }
    return (
      !OtnRackType ||
      !OtnRackTypeFile ||
      !OtnBatteryType ||
      !OtnBatteryQtY ||
      !OtnBBTime ||
      !OtnBBcapecity ||
      !OtnRectifierType ||
      !OtnRectifierTypeFile ||
      !OtnRectifierCapecity ||
      !OtnRectifierQTY ||
      !OtnSecurity ||
      !OtnSecurityFile ||
      !OtnSecurityType ||
      !OTNTX
    );
  };

  const getMissingFieldsMessage = () => {
    switch (currentPage) {
      case 1:
        if (!siteId || !city || !siteType || !image || !imageST) {
          return "Please fill out all the fields.";
        }
        return null;
      case 2:
        if (
          TDD === "YES" &&
          (!PowerRactType ||
            !imagePRT ||
            !RackType ||
            !batteryType ||
            !imageBT ||
            !BatteryQTY ||
            !BBTime ||
            !BBcapacity ||
            !RectifireType ||
            !imageRT ||
            RectifireQTY === null ||
            RectifireCapacity === null ||
            !Security ||
            !RackTypeFile ||
            !imageS ||
            !SecurityType ||
            !Mesh ||
            !imageM)
        )
          return "Please fill out all the fields.";

      case 3:
        if (
          !GesmRackType ||
          !GesmPowerRackType ||
          !GesmBatteryType ||
          !GesmBatteryQtY ||
          !GesmBBTime ||
          !GesmBBcapecity ||
          !GesmRectifierType ||
          !GesmRectifierTypeFile ||
          GesmRectifierCapecity === null ||
          GesmRectifierCapecity === null ||
          !GesmSecurity ||
          !GesmSecurityFile ||
          !GesmSecurityType ||
          !GesmMesh ||
          (GesmMesh === "YES" && !GesmMeshFile)
        )
          return "Please fill out all the fields.";

      case 4:
        if (
          !counternoacmeter ||
          !counternoacmeterFile ||
          !acmeterboxlocation ||
          !acmeterboxlocationFile ||
          !ac1A ||
          !ac2A ||
          !ac3A ||
          !Dedicatedtransformer ||
          (Dedicatedtransformer === "Yes" && !deticatedtransformercapacity)
        )
          return "Please fill out all the fields.";

      case 5:
        if (
          Fence === "No" ||
          (Fence === "YES" &&
            (!FenceType ||
              !FenceTypeFile ||
              !acmeterboxlocationFile ||
              !Fencegiralock))
        )
          return "Please fill out all the fields.";
      case 6:
        if (
          !SunShade ||
          !SunShadeFile ||
          !Share ||
          !HostOperator ||
          !Safe ||
          !EquipmentfixingType ||
          !EquipmentfixingTypeFile
        )
          return "Please fill out all the fields.";
      case 7:
        if (
          !TowerType ||
          !TowerTypeFile ||
          !TowerSupplier ||
          !TowerSupplierFile ||
          !TowerHeight ||
          !FPAmaximumLoading
        )
          return "Please fill out all the fields.";
      case 8:
        if (
          !OtnRackType ||
          !OtnRackTypeFile ||
          !OtnBatteryType ||
          !OtnBatteryQtY ||
          !OtnBBTime ||
          !OtnBBcapecity ||
          !OtnRectifierType ||
          !OtnRectifierTypeFile ||
          !OtnRectifierCapecity ||
          !OtnRectifierQTY ||
          !OtnSecurity ||
          !OtnSecurityFile ||
          !OtnSecurityType ||
          !OTNTX
        )
          return "Please fill out all the fields.";
        return null;
      default:
        return null;
    }
  };
  const getFieldClassName = (fieldValue, isValid) => {
    if (!fieldValue || !isValid) {
      return "error";
    }
    return "";
  };

  return issubmited ? (
    <CongratsPage
      text="Congratulations! Your form has been submitted."
      backgroundColor="rgb(63, 81, 181)"
      textColor="white"
      confettiColors={["#FF5733", "#33FF57", "#5733FF", "#FFFF33"]}
      numberOfConfetti={400}
      redirectTo="/DataBase"
    />
  ) : (
    <div className="bg-1C1C40 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full overflow-y-auto">
        {renderCurrentPage()}
        <div className="flex flex-col mt-4">
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none mb-2"
              onClick={handlePrevPage}
            >
              Back
            </button>
          )}
          {currentPage < TOTAL_PAGES && (
            <button
              onClick={handleNextPage}
              disabled={isNextButtonDisabled()}
              className={`${
                isNextButtonDisabled()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600"
              } px-4 py-2 text-white rounded focus:outline-none transition duration-300 ease-in-out mb-2 hover:bg-red-700`}
            >
              Next
            </button>
          )}
          {currentPage === TOTAL_PAGES && (
            <button
              onClick={() => {
                handleNextPage();
                setissubmited(true);
              }}
              disabled={isSubmitButtonDisabled()}
              className={`${
                isSubmitButtonDisabled()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600"
              } px-4 py-2 text-white rounded focus:outline-none transition duration-300 ease-in-out mb-2 hover:bg-green-700`}
            >
              Submit
            </button>
          )}
          {((isSubmitButtonDisabled() && currentPage === TOTAL_PAGES) ||
            (currentPage < TOTAL_PAGES && isNextButtonDisabled())) && (
            <p className="text-red-500 text-sm mb-2">
              {getMissingFieldsMessage()}
            </p>
          )}

          {issubmited && <MyProgressBar progress={progress} />}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
