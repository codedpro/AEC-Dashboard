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

    const siteID = req.body.siteID || "NoSiteIDProvided"; // Default if no siteID is provided

    const yearPath = path.join(
      "C:",
      "Users",
      "Administrator",
      "Desktop",
      "UploadedFiles",
      "CM",
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
        { name: "beforework", maxCount: 50 },
        { name: "working", maxCount: 50 },
        { name: "afterwork", maxCount: 50 },
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
        const siteID = req.body.siteID || "NoSiteIDProvided"; // Default if no siteID is provided
        const username = req.body.username || "Nousername";

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
          "CM",
          year.toString(),
          month,
          `week${week}`,
          day.toString(),
          username,
          siteID
        );
        // Create a subdirectory for each category if it has files
        const categories = ["beforework", "working", "afterwork"];

        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];

          if (uploadedFiles[category] && uploadedFiles[category].length > 0) {
            // Use (i + 1) as the index number for the category
            const categoryIndex = i + 1;
            const categoryDirectory = path.join(
              baseDirectory,
              `${categoryIndex}_${category}`
            );

            if (!fs.existsSync(categoryDirectory)) {
              fs.mkdirSync(categoryDirectory, { recursive: true });
            }

            // Move uploaded files to the category directory
            for (const file of uploadedFiles[category]) {
              const sourcePath = file.path;
              const destinationPath = path.join(
                categoryDirectory,
                file.filename
              );
              fs.renameSync(sourcePath, destinationPath);
            }
          }
        }

        const response = {
          message: "Media uploaded and processed successfully",
          processedFiles,
          siteID,
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
