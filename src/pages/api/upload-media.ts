import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const startOfYear = new Date(year, 0, 1);
    const daysPassed = Math.floor(
      (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
    );
    const week = Math.ceil((daysPassed + startOfYear.getDay() + 1) / 7);

    const yearPath = path.join(
      "C:",
      "Users",
      "Administrator",
      "Desktop",
      "UploadedFiles",
      "media",
      year.toString()
    );
    const day = currentDate.getDate();

    const monthPath = path.join(yearPath, month);
    const weekPath = path.join(monthPath, `week${week}`);
    const datePath = path.join(weekPath, `${day}`);

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

    cb(null, datePath);
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(7); 
    const originalNameWithoutExtension = file.originalname.replace(
      /\.[^/.]+$/,
      ""
    ); 
    const uniqueFileName = `${originalNameWithoutExtension}_${randomString}${path.extname(
      file.originalname
    )}`;

    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      upload.fields([
        { name: "file", maxCount: 1 },
        { name: "fileST", maxCount: 1 },
        { name: "filePRT", maxCount: 1 },
        { name: "fileTDD", maxCount: 1 },
        { name: "fileBT", maxCount: 1 },
        { name: "fileRT", maxCount: 1 },
        { name: "fileS", maxCount: 1 },
        { name: "fileM", maxCount: 1 },
        { name: "GesmRackTypeFile", maxcount: 1 },
        { name: "GesmPowerRackTypeFile", maxcount: 1 },
        { name: "GesmBatteryTypeFile", maxcount: 1 },
        { name: "GesmRectifierTypeFile", maxcount: 1 },
        { name: "GesmSecurityFile", maxcount: 1 },
        { name: "GesmMeshFile", maxcount: 1 },
        { name: "counternoacmeterFile", maxcount: 1 },
        { name: "acmeterboxlocationFile", maxcount: 1 },
        { name: "FenceTypeFile", maxcount: 1 },
        { name: "SunShadeFile", maxcount: 1 },
        { name: "EquipmentfixingTypeFile", maxcount: 1 },
        { name: "TowerSupplierFile", maxCount: 1 },
        { name: "TowerTypeFile", maxCount: 1 },
        { name: "OtnRackTypeFile", maxCount: 1 },
        { name: "OtnRectifierTypeFile", maxCount: 1 },
        { name: "OtnSecurityFile", maxCount: 1 },
        { name: "RackTypeFile", maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          console.error("Error uploading files:", err);
          return res.status(500).json({ message: "Error uploading files" });
        }

        const uploadedFiles = req.files;

        const processedFiles = {};
        for (const fieldName in uploadedFiles) {
          const file = uploadedFiles[fieldName][0];
          const filePath = file.path;

          if (fs.existsSync(filePath)) {
            processedFiles[fieldName] = file.filename;
          }
        }

        const response = {
          message: "Media uploaded and processed successfully",
          processedFiles,
        };

        return res.status(200).json(response);
      });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
