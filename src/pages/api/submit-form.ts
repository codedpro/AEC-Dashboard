import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import * as exceljs from "exceljs";
import multer from "multer";
import path from "path";
import fs from "fs";
const mainExcelFilePath =
  "C:/Users/Administrator/Desktop/UploadedFiles/database/main.xlsx";

const storage = multer.diskStorage({
  destination: "C:/Users/Administrator/Desktop/UploadedFiles/database",
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    callback(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const upload = multer({ storage });

interface FormSubmitData {
  siteId: string;
  UserName: string;
  siteType: string;
  city: string;
  TDD: string;
  PowerRactType: string;
  RackType: string;
  BatteryQTY: string;
  BBTime: string;
  BBcapacity: number;
  RectifireType: string;
  RectifireQTY: number;
  RectifireCapacity: number;
  Security: string;
  SecurityType: string;
  Mesh: string;
  GesmRackType: string;
  GesmPowerRackType: string;
  GesmBatteryType: string;
  GesmBatteryQtY: string;
  GesmBBTime: string;
  GesmBBcapecity: string;
  GesmRectifierType: string;
  GesmRectifierQTY: number;
  GesmRectifierCapecity: number;
  GesmSecurity: string;
  GesmSecurityType: string;
  GesmMesh: string;
  //Page 4
  counternoacmeter: string;
  acmeterboxlocation: string;
  ac1A: string;
  ac2A: string;
  ac3A: string;
  Dedicatedtransformer: string;
  deticatedtransformercapacity: string;
  //Page5
  Fence: string;
  FenceType: string;
  Fencegiralock: string;
  //page 6
  SunShade: string;
  Share: string;
  HostOperator: string;
  Safe: string;
  EquipmentfixingType: string;
  // Page 7
  TowerType: string;
  TowerSupplier: string;
  TowerHeight: string;
  FPAmaximumLoading: string;
  Totalused: string;
  // Page 8
  OTNTX: string;
  OtnRackType: string;
  OtnBatteryType: string;
  OtnBatteryQtY: string;
  OtnBBTime: string;
  OtnBBcapecity: string;
  OtnRectifierType: string;
  OtnRectifierQTY: string;
  OtnRectifierCapecity: string;
  OtnSecurity: string;
  OtnSecurityType: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Error uploading image" });
      } else if (err) {
        return res.status(500).json({ message: "An error occurred" });
      }

      const formData: FormSubmitData = req.body;
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("FormData");
      let mainWorkbook: exceljs.Workbook;
      if (fs.existsSync(mainExcelFilePath)) {
        mainWorkbook = new exceljs.Workbook();
        await mainWorkbook.xlsx.readFile(mainExcelFilePath);
      } else {
        mainWorkbook = new exceljs.Workbook();
        const mainWorksheet = mainWorkbook.addWorksheet("MainData");
        mainWorksheet.addRow([
          "Site ID",
          "UserName",
          "Site Type",
          "City",
          "Date",
          "TDD",
          "PowerRactType",
          "RackType",
          "BatteryQTY",
          "BBTime",
          "BBcapacity",
          "RectifireType",
          "RectifireQTY",
          "RectifireCapacity",
          "Security",
          "SecurityType",
          "Mesh",
          "GsmRackType",
          "GsmPowerRackType",
          "GsmBatteryType",
          "GsmBatteryQtY",
          "GsmBBTime",
          "GsmBBcapecity",
          "GsmRectifierType",
          "GsmRectifierQTY",
          "GsmRectifierCapecity",
          "GsmSecurity",
          "GsmSecurityType",
          "GsmMesh",
          "counternoacmeter",
          "acmeterboxlocation",
          "ac1A",
          "ac2A",
          "ac3A",
          "Dedicatedtransformer",
          "deticatedtransformercapacity",
          "Fence",
          "FenceType",
          "Fencegiralock",
          "SunShade",
          "Share",
          "HostOperator",
          "Safe",
          "EquipmentfixingType",
          // Page 7
          "TowerType",
          "TowerSupplier",
          "TowerHeight",
          "FPAmaximumLoading",
          "Totalused",
          // Page 8
          "OTNTX",
          "OtnRackType",
          "OtnBatteryType",
          "OtnBatteryQtY",
          "OtnBBTime",
          "OtnBBcapecity",
          "OtnRectifierType",
          "OtnRectifierQTY",
          "OtnRectifierCapecity",
          "OtnSecurity",
          "OtnSecurityType",
        ]);
      }

      worksheet.addRow([
        "Site ID",
        "UserName",
        "Site Type",
        "City",
        "Date",
        "TDD",
        "PowerRactType",
        "RackType",
        "BatteryQTY",
        "BBTime",
        "BBcapacity",
        "RectifireType",
        "RectifireQTY",
        "RectifireCapacity",
        "Security",
        "SecurityType",
        "Mesh",
        "GsmRackType",
        "GsmPowerRackType",
        "GsmBatteryType",
        "GsmBatteryQtY",
        "GsmBBTime",
        "GsmBBcapecity",
        "GsmRectifierType",
        "GsmRectifierQTY",
        "GsmRectifierCapecity",
        "GsmSecurity",
        "GsmSecurityType",
        "GsmMesh",
        "counternoacmeter",
        "acmeterboxlocation",
        "ac1A",
        "ac2A",
        "ac3A",
        "Dedicatedtransformer",
        "deticatedtransformercapacity",
        "Fence",
        "FenceType",
        "Fencegiralock",
        "SunShade",
        "Share",
        "HostOperator",
        "Safe",
        "EquipmentfixingType",
        // Page 7
        "TowerType",
        "TowerSupplier",
        "TowerHeight",
        "FPAmaximumLoading",
        "Totalused",
        // Page 8
        "OTNTX",
        "OtnRackType",
        "OtnBatteryType",
        "OtnBatteryQtY",
        "OtnBBTime",
        "OtnBBcapecity",
        "OtnRectifierType",
        "OtnRectifierQTY",
        "OtnRectifierCapecity",
        "OtnSecurity",
        "OtnSecurityType",
      ]);
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
      const mainWorksheet = mainWorkbook.getWorksheet("MainData");
      mainWorksheet.addRow([
        formData.siteId,
        formData.UserName,
        formData.siteType,
        formData.city,
        `${year}/${
          currentDate.getMonth() + 1
        }/${day} ${hours}:${minutes}:${seconds}`,
        formData.TDD,
        formData.PowerRactType,
        formData.RackType,
        formData.BatteryQTY,
        formData.BBTime,
        formData.BBcapacity,
        formData.RectifireType,
        formData.RectifireQTY,
        formData.RectifireCapacity,
        formData.Security,
        formData.SecurityType,
        formData.Mesh,
        formData.GesmRackType,
        formData.GesmPowerRackType,
        formData.GesmBatteryType,
        formData.GesmBatteryQtY,
        formData.GesmBBTime,
        formData.GesmBBcapecity,
        formData.GesmRectifierType,
        formData.GesmRectifierQTY,
        formData.GesmRectifierCapecity,
        formData.GesmSecurity,
        formData.GesmSecurityType,
        formData.GesmMesh,
        formData.counternoacmeter,
        formData.acmeterboxlocation,
        formData.ac1A,
        formData.ac2A,
        formData.ac3A,
        formData.Dedicatedtransformer,
        formData.deticatedtransformercapacity,
        formData.Fence,
        formData.FenceType,
        formData.Fencegiralock,
        formData.SunShade,
        formData.Share,
        formData.HostOperator,
        formData.Safe,
        formData.EquipmentfixingType,
        // Page 7
        formData.TowerType,
        formData.TowerSupplier,
        formData.TowerHeight,
        formData.FPAmaximumLoading,
        formData.Totalused,
        // Page 8
        formData.OTNTX,
        formData.OtnRackType,
        formData.OtnBatteryType,
        formData.OtnBatteryQtY,
        formData.OtnBBTime,
        formData.OtnBBcapecity,
        formData.OtnRectifierType,
        formData.OtnRectifierQTY,
        formData.OtnRectifierCapecity,
        formData.OtnSecurity,
        formData.OtnSecurityType,
      ]);
      worksheet.addRow([
        formData.siteId,
        formData.UserName,
        formData.siteType,
        formData.city,
        `${year}/${
          currentDate.getMonth() + 1
        }/${day} ${hours}:${minutes}:${seconds}`,
        formData.TDD,
        formData.PowerRactType,
        formData.RackType,
        formData.BatteryQTY,
        formData.BBTime,
        formData.BBcapacity,
        formData.RectifireType,
        formData.RectifireQTY,
        formData.RectifireCapacity,
        formData.Security,
        formData.SecurityType,
        formData.Mesh,
        formData.GesmRackType,
        formData.GesmPowerRackType,
        formData.GesmBatteryType,
        formData.GesmBatteryQtY,
        formData.GesmBBTime,
        formData.GesmBBcapecity,
        formData.GesmRectifierType,
        formData.GesmRectifierQTY,
        formData.GesmRectifierCapecity,
        formData.GesmSecurity,
        formData.GesmSecurityType,
        formData.GesmMesh,
        formData.counternoacmeter,
        formData.acmeterboxlocation,
        formData.ac1A,
        formData.ac2A,
        formData.ac3A,
        formData.Dedicatedtransformer,
        formData.deticatedtransformercapacity,
        formData.Fence,
        formData.FenceType,
        formData.Fencegiralock,
        formData.SunShade,
        formData.Share,
        formData.HostOperator,
        formData.Safe,
        formData.EquipmentfixingType,
        // Page 7
        formData.TowerType,
        formData.TowerSupplier,
        formData.TowerHeight,
        formData.FPAmaximumLoading,
        formData.Totalused,
        // Page 8
        formData.OTNTX,
        formData.OtnRackType,
        formData.OtnBatteryType,
        formData.OtnBatteryQtY,
        formData.OtnBBTime,
        formData.OtnBBcapecity,
        formData.OtnRectifierType,
        formData.OtnRectifierQTY,
        formData.OtnRectifierCapecity,
        formData.OtnSecurity,
        formData.OtnSecurityType,
      ]);

      const yearPath = path.join(
        "C:/Users/Administrator/Desktop/UploadedFiles/database",
        year.toString()
      );
      const monthPath = path.join(yearPath, month);
      const weekPath = path.join(monthPath, `week${week}`);
      //  const datePath = path.join(weekPath, `${day}-${currentDate.getMonth() + 1}-${year}`);
      const datePath = path.join(weekPath, `${day}`);

      try {
        if (!fs.existsSync(yearPath)) {
          fs.mkdirSync(yearPath, { recursive: true });
        }
        if (!fs.existsSync(monthPath)) {
          fs.mkdirSync(monthPath);
        }
        if (!fs.existsSync(weekPath)) {
          fs.mkdirSync(weekPath);
        }
        if (!fs.existsSync(datePath)) {
          fs.mkdirSync(datePath);
        }

        const fileName = `${formData.siteId}_${year}-${
          currentDate.getMonth() + 1
        }-${day}_${hours}-${minutes}-${seconds}.xlsx`;
        const excelFilePath = path.join(datePath, fileName);

        await workbook.xlsx.writeFile(excelFilePath);
        await mainWorkbook.xlsx.writeFile(mainExcelFilePath);

        console.log("Excel file saved successfully");
        res
          .status(200)
          .json({ message: "Form submitted and Excel file saved" });
      } catch (error) {
        console.error("Error saving Excel file:", error);
        res
          .status(500)
          .json({ message: "An error occurred while saving the Excel file" });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
