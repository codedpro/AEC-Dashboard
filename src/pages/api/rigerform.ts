import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  async destination(req, file, cb) {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.toLocaleString("default", { month: "long" });
      const week = getWeekNumber(currentDate);
      const day = currentDate.getDate();

      const username2 = req.body.username2 || "NoUsername";

      const siteId2 = req.body.siteId2 || "NoSiteIDProvided";

      const category = file.fieldname;
      const baseDirectory = path.join(
        "C:",
        "Users",
        "Administrator",
        "Desktop",
        "UploadedFiles",
        "RigerForm",
        year.toString(),
        month,
        `week${week}`,
        day.toString(),
        username2,
        siteId2,
        category
      );

      await mkdir(baseDirectory, { recursive: true });
      cb(null, baseDirectory);
    } catch (error) {
      console.error("Error creating destination directory:", error);
      cb(error, "");
    }
  },
  filename(req, file, cb) {
    const randomString = Math.random().toString(36).substring(7);
    const uniqueFileName = `${randomString}_${file.originalname}`;

    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
const mainExcelFilePath = path.join(
  "C:",
  "Users",
  "Administrator",
  "Desktop",
  "UploadedFiles",
  "RigerForm",
  "mainData.xlsx"
);
const generateAntennaHeaders = () => {
  const antennas = [];
  const antennasTypes = ["900", "1800", "2100", "2300", "2600"];
  for (let type of antennasTypes) {
    for (let i = 1; i <= 10; i++) {
      antennas.push(`${type}_${i}`);
    }
  }
  return antennas;
};

const antennaHeaders = generateAntennaHeaders();

const generateProtectionHeaders = () => {
  const protections = [];
  const protectionTypes = ["30", "60", "90", "120"];
  for (let type of protectionTypes) {
    for (let i = 1; i <= 10; i++) {
      protections.push(`protection_${type}_${i}`);
    }
  }
  return protections;
};

const protectionHeaders = generateProtectionHeaders();

const mainWorkbook = new ExcelJS.Workbook();
const mainHeaders = [
  "siteId",
  "username",
  "roadArrestor",
  "aviationLight",
  "light",
  "mwAntSize",
  "TDDAnt",
  ...protectionHeaders,
  ...antennaHeaders,
];

async function loadMainWorkbook() {
  try {
    const fileExists = fs.existsSync(mainExcelFilePath);
    if (fileExists) {
      await mainWorkbook.xlsx.readFile(mainExcelFilePath);
    } else {
      const mainWorksheet = mainWorkbook.addWorksheet("Main Data");
      mainWorksheet.columns = mainHeaders.map((header) => ({
        header,
        key: header,
        width: 15,
      }));
      await mainWorkbook.xlsx.writeFile(mainExcelFilePath);
    }
  } catch (error) {
    throw error;
  }
}

loadMainWorkbook().then(() => {
  console.log("Main Excel file loaded or created:", mainExcelFilePath);
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      upload.any()(req, res, async (err) => {
        if (err) {
          console.error("Error uploading files:", err);
          return res.status(500).json({ message: "Error uploading files" });
        }
        if (
          req.body.siteId &&
          req.body.username &&
          req.body.roadArrestor &&
          req.body.aviationLight &&
          req.body.light
        ) {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Form Data");
          const headers = mainHeaders;
          worksheet.columns = headers.map((header) => ({
            header,
            key: header,
            width: 15,
          }));
          const validHeaders = new Set(headers);
          const dataRow = headers.map((header) => {
            if (validHeaders.has(header)) {
              return req.body[header] || null;
            } else {
              return null;
            }
          });

          worksheet.addRow(dataRow);

          const siteId2 = req.body.siteId2 || "NoSiteIDProvided";
          const username2 = req.body.username2 || "NoUsername";

          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.toLocaleString("default", {
            month: "long",
          });
          const week = getWeekNumber(currentDate);
          const day = currentDate.getDate();

          const formattedDate = currentDate.toISOString().split("T")[0];
          const fileName = `${siteId2}_${formattedDate}.xlsx`;
          const destinationDirectory = path.join(
            "C:",
            "Users",
            "Administrator",
            "Desktop",
            "UploadedFiles",
            "RigerForm",
            year.toString(),
            month,
            `week${week}`,
            day.toString(),
            username2,
            siteId2
          );
          await mkdir(destinationDirectory, { recursive: true });

          const excelFilePath = path.join(destinationDirectory, fileName);
          try {
            await workbook.xlsx.writeFile(excelFilePath);
            console.log("Excel file saved:", excelFilePath);
            const mainRowData = headers.map((header) => {
              if (validHeaders.has(header)) {
                return req.body[header] || null;
              } else {
                return null;
              }
            });
            const mainWorksheet = mainWorkbook.getWorksheet("Main Data");
            mainWorksheet.addRow(mainRowData);
            await mainWorkbook.xlsx.writeFile(mainExcelFilePath);
            console.log("Main Excel file updated with new data.");
          } catch (excelError) {
            console.error("Error saving Excel file:", excelError);
            return res.status(500).json({ message: "Error saving Excel file" });
          }

          const response = {
            message: "Media uploaded and processed successfully",
            siteId2,
          };

          return res.status(200).json(response);
        } else {
          return res.status(400).json({ message: "Invalid request" });
        }
      });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
