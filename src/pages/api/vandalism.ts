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
    const week = getWeekNumber(currentDate);
    const day = currentDate.getDate();

    const username = req.body.username || "Nousername";

    const siteID = req.body.siteID || "NoSiteIDProvided";

    const yearPath = path.join(
      "C:",
      "Users",
      "Administrator",
      "Desktop",
      "UploadedFiles",
      "vandalism",
      year.toString()
    );

    const monthPath = path.join(yearPath, month);
    const weekPath = path.join(monthPath, `week${week}`);

    const dayPath = path.join(weekPath, day.toString());
    const usernamePath = path.join(dayPath, username);
    const siteIDPath = path.join(usernamePath, siteID);

    if (!fs.existsSync(yearPath)) {
      fs.mkdirSync(yearPath, { recursive: true });
    }
    if (!fs.existsSync(monthPath)) {
      fs.mkdirSync(monthPath);
    }
    if (!fs.existsSync(weekPath)) {
      fs.mkdirSync(weekPath);
    }
    if (!fs.existsSync(dayPath)) {
      fs.mkdirSync(dayPath);
    }
    if (!fs.existsSync(usernamePath)) {
      fs.mkdirSync(usernamePath);
    }
    if (!fs.existsSync(siteIDPath)) {
      fs.mkdirSync(siteIDPath);
    }

    cb(null, siteIDPath);
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

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      upload.fields([
        { name: "siteID", maxCount: 1 },
        { name: "siteImages", maxCount: 10 },
        { name: "environmentImages", maxCount: 10 },
        { name: "roadImages", maxCount: 10 },
        { name: "racksImages", maxCount: 10 },
        { name: "vandalismImages", maxCount: 50 },
        { name: "lockImage", maxCount: 10 },
        { name: "policeReportImage", maxCount: 10 },
        { name: "username", maxCount: 1 },
        { name: "comment", maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          console.error("Error uploading files:", err);
          return res.status(500).json({ message: "Error uploading files" });
        }

        const uploadedFiles = req.files;

        const processedFiles = {};
        for (const fieldName in uploadedFiles) {
          const files = uploadedFiles[fieldName];
          const fieldFileNames = [];

          for (const file of files) {
            const filePath = file.path;
            if (fs.existsSync(filePath)) {
              fieldFileNames.push(file.filename);
            }
          }

          processedFiles[fieldName] = fieldFileNames;
        }
        const siteID = req.body.siteID || "NoSiteIDProvided";
        const username = req.body.username || "Nousername";
        const comment = req.body.comment;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString("default", { month: "long" });
        const week = getWeekNumber(currentDate);
        const day = currentDate.getDate();

        const baseDirectory = path.join(
          "C:",
          "Users",
          "Administrator",
          "Desktop",
          "UploadedFiles",
          "vandalism",
          year.toString(),
          month,
          `week${week}`,
          day.toString(),
          username,
          siteID
        );
        const categories = [
          "siteImages",
          "environmentImages",
          "roadImages",
          "racksImages",
          "vandalismImages",
          "lockImage",
          "policeReportImage",
        ];

        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];
          const categoryDirectory = path.join(
            baseDirectory,
            `${i}_${category}`
          );

          if (!fs.existsSync(categoryDirectory)) {
            fs.mkdirSync(categoryDirectory, { recursive: true });
          }

          for (const file of uploadedFiles[category]) {
            const sourcePath = file.path;
            const destinationPath = path.join(categoryDirectory, file.filename);

            fs.renameSync(sourcePath, destinationPath);
          }
        }

        const textFilePath = path.join(baseDirectory, `${siteID}.txt`);
        fs.writeFileSync(textFilePath, comment);

        const response = {
          message: "Media uploaded and processed successfully",
          processedFiles,
          siteID,
          comment,
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
