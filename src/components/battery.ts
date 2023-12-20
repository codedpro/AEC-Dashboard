import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";
import pptxgen from "pptxgenjs";
import imageSize from "image-size";
import sizeOf from "image-size";

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
      "battery",
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
const categoriesInfo = [
  {
    name: "siteidimage",
    title: `Site ID :`,
    description: "",
  },
  {
    name: "namayePower",
    title: "",
    description:
      "Clear photo of power module unit (PMU), rectifier, DC fuse, battery temp sensor, DC cabling and connection",
  },
  {
    name: "ssvoltaj",
    title: "Power Values",
    description: "Check and record all power values in PMU",
  },
  {
    name: "sslimit",
    title: "Charge Max Current / Current Limit Value             ",
    description:
      "Clear photo of Maximum charge current ratio. Check,(modify if needed) and record.",
  },

  {
    name: "psu",
    title: "Rectifier",
    description:
      "Clear photo of Rectifiers Quantity and Capacity of them be filled in second part of excel template",
  },

  {
    name: "ssdekinfire",
    title: "",
    description: "Power Animation & Rectifier Status & Rectifier Detail",
  },
  {
    name: "kolibatterybank",
    title: "Battery",
    description:
      "Clear photo of batteries showing Brand, Capacity and Qty of them. Above information to be recorded in second section of excel template",
  },
  {
    name: "Battery information and Serial Numbers            ",
    title: "Battery Serial Title",
    description:
      "حتماً اطلاعات باتری در زمان نصب قید شود (تعداد ، مدل ، تاریخ نصب) و سریال ها را عکس بگیرید",
  },
  {
    name: "serialnumberexcel",
    title: "Serial number excel",
    description: "",
  },
  {
    name: "batteryvoltaj",
    title: "Measurement",
    description:
      "Clear photo of Load current (measured by Clamp) and Folate voltage (measured by volt meter) and fill the second part of template.",
  },
  {
    name: "loadsite",
    title: "Measurement",
    description: "",
  },
  {
    name: "test",
    title: "  ",
    description: "Double check excel file & ensure no Red value",
  },
  {
    name: "test2",
    title: "",
    description:
      "تعداد رکتیفایر اگر در جدول قرمز شود نباید باتری تست انجام داد.",
  },
  {
    name: "ssllvd",
    title: "Change the priority load",
    description:
      "Clear photo of Changing the LLVD to 44.5 V. (Only if it’s original value isn’t 44 V)",
  },
  {
    name: "batteryfields",
    title: "Battery Test",
    description:
      "Clear photo with time of disconnecting all string of batteries from power supply.",
  },
  {
    name: "voltajstrink",
    title: "Battery Test",
    description: "Voltages after 15 min fuse off",
  },
  {
    name: "voltajstrink2",
    title: "Battery Test",
    description: "Voltages after 15 min fuse off",
  },
  {
    name: "fiozbattery",
    title: "Battery Test",
    description: "عکس وصل مجدد فیوز باتری ها و قطع برق اصلی :",
  },
  {
    name: "om",
    title: "0 min",
    description:
      "اگر cell faulty در رک های مختلف مشاهده شد باید جابجا شده و در یک رک جمع شود و رک فالتی ها از مدار خارج شود.",
  },
  {
    name: "twentym",
    title: "20 min",
    description:
      "اگر cell faulty در رک های مختلف مشاهده شد باید جابجا شده و در یک رک جمع شود و رک فالتی ها از مدار خارج شود.",
  },
  {
    name: "fortym",
    title: "40 min",
    description: "",
  },
  {
    name: "sixtym",
    title: "60 min",
    description: "",
  },
  {
    name: "eightym",
    title: "80 min",
    description: "",
  },
  {
    name: "onehundredm",
    title: "100 min",
    description: "",
  },
  {
    name: "onehundredtwentym",
    title: "120 min",
    description: "",
  },
  {
    name: "ssexcelvoltaj",
    title: "Battery Test",
    description: "Battery test Excel Template",
  },
  {
    name: "batterytags",
    title: "Battery Labels",
    description:
      "شامل کد سایت  /  تاریخ تست  /  زمان ساپورت و سالم یا فالتی بودن هر باتری",
  },
];
async function addImagesToSlide(slide, categoryDirectory) {
  const imageFiles = fs.readdirSync(categoryDirectory);
  const maxColumns = 6;
  const headerHeightPercent = 15;
  const bottomMarginPercent = 5;
  const gapBetweenImagesPercent = 2;
  const numImages = imageFiles.length;

  const numRows = Math.ceil(numImages / maxColumns);
  const numColumns = Math.min(numImages, maxColumns);

  const marginPercent = 1;
  const marginX = 1;
  const marginY = 15;
  const marginBottom = bottomMarginPercent;
  const horizontalGap = gapBetweenImagesPercent / 2;
  const verticalGap = gapBetweenImagesPercent;

  let cellWidth = ((100 -
    2 * marginPercent -
    (numColumns - 1) * horizontalGap) /
    numColumns) as number;
  let cellHeight = ((100 -
    headerHeightPercent -
    marginBottom -
    (numRows - 1) * verticalGap) /
    numRows) as number;

  if (numColumns === 1) {
    cellWidth *= 0.8;
    cellHeight *= 0.8;
  }
  if (numColumns === 2) {
    cellWidth *= 1.5;
    cellHeight *= 1.5;
  }
  if (numColumns === 3) {
    cellWidth *= 1.5;
    cellHeight *= 1.5;
  }
  if (numColumns >= 4 && numColumns < 6) {
    cellWidth *= 2;
    cellHeight *= 2;
  }
  if (numColumns >= 6 && numColumns <= 12) {
    cellWidth *= 2;
    cellHeight *= 1.8;
  }
  if (numColumns >= 13) {
    cellWidth *= 1;
    cellHeight *= 1;
  }
  let positionCounter = 0;

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      if (positionCounter >= numImages) {
        break;
      }

      const imageFile = imageFiles[positionCounter];
      const imagePath = path.join(categoryDirectory, imageFile);
      if (imageFile.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const dimensions = sizeOf(imagePath);

        let x, y, w, h, rotate;

        if (dimensions.height > dimensions.width) {
          x = `${marginX + colIndex * (cellWidth + horizontalGap)}%`;
          y = `${
            headerHeightPercent +
            marginY +
            rowIndex * (cellHeight + verticalGap)
          }%`;
          w = `${cellWidth / 2}%`;
          h = `${(cellWidth / dimensions.width) * dimensions.height}%`;
          rotate = 0;
        } else {
          x = `${marginX + colIndex * (cellWidth / 2)}%`;
          y = `${headerHeightPercent + marginY + rowIndex * (cellHeight / 2)}%`;
          h = `${(cellWidth / dimensions.width) * dimensions.height}%`;
          w = `${cellWidth / 2}%`;
          rotate = 90;
        }

        slide.addImage({
          path: imagePath,
          x,
          y,
          w,
          h,
          rotate,
        });

        positionCounter++;
      } else {
        positionCounter++;
      }
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      upload.fields([
        { name: "siteID", maxCount: 1 },
        { name: "siteidimage", maxCount: 50 },
        { name: "namayePower", maxCount: 50 },
        { name: "psu", maxCount: 50 },
        { name: "kolibatterybank", maxCount: 50 },
        { name: "batteryserial", maxCount: 50 },
        { name: "batteryvoltaj", maxCount: 50 },
        { name: "loadsite", maxCount: 50 },
        { name: "batteryfields", maxCount: 50 },
        { name: "voltajstrink", maxCount: 50 },
        { name: "fiozbattery", maxCount: 50 },
        { name: "om", maxCount: 50 },
        { name: "twentym", maxCount: 50 },
        { name: "fortym", maxCount: 50 },
        { name: "sixtym", maxCount: 50 },
        { name: "eightym", maxCount: 50 },
        { name: "onehundredm", maxCount: 50 },
        { name: "onehundredtwentym", maxCount: 50 },
        { name: "batterytags", maxCount: 50 },
        { name: "ssvoltaj", maxCount: 50 },
        { name: "sslimit", maxCount: 50 },
        { name: "ssdekinfire", maxCount: 50 },
        { name: "ssllvd", maxCount: 50 },
        { name: "ssexcelvoltaj", maxCount: 50 },
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
          "battery",
          year.toString(),
          month,
          `week${week}`,
          day.toString(),
          username,
          siteID
        );
        const categories = [
          "siteidimage",
          "namayePower",
          "psu",
          "kolibatterybank",
          "batteryserial",
          "batteryvoltaj",
          "loadsite",
          "batteryfields",
          "voltajstrink",
          "fiozbattery",
          "om",
          "twentym",
          "fortym",
          "sixtym",
          "eightym",
          "onehundredm",
          "onehundredtwentym",
          "batterytags",
          "ssvoltaj",
          "sslimit",
          "ssdekinfire",
          "ssllvd",
          "ssexcelvoltaj",
        ];

        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];

          if (uploadedFiles[category] && uploadedFiles[category].length > 0) {
            const categoryDirectory = path.join(baseDirectory, `${category}`);

            if (!fs.existsSync(categoryDirectory)) {
              fs.mkdirSync(categoryDirectory, { recursive: true });
            }
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

        const pptx = new pptxgen();
        const coverSlide = pptx.addSlide();
        coverSlide.addShape(pptx.shapes.RECTANGLE, {
          x: "0%",
          y: "0%",
          w: "100%",
          h: "100%",
          fill: "FFCC01",
        });

        coverSlide.addText("MTN Irancell", {
          x: "0%",
          y: "35%",
          w: "100%",
          h: "10%",
          fontSize: 36,
          bold: true,
          color: "000000",
          valign: "middle",
          align: "center",
        });

        coverSlide.addText("Battery Test", {
          x: "0%",
          y: "45%",
          w: "100%",
          h: "15%",
          fontSize: 24,
          bold: true,
          color: "000000",
          valign: "middle",
          align: "center",
        });

        const logoPath = path.join(
          "C:",
          "Users",
          "Administrator",
          "Desktop",
          "UploadedFiles",
          "battery",
          "irancell.png"
        );

        coverSlide.addImage({
          path: logoPath,
          x: "40%",
          y: "60%",
          w: "20%",
          h: "15%",
        });

        for (let i = 0; i < categoriesInfo.length; i++) {
          const categoryInfo = categoriesInfo[i];
          const category = categoryInfo.name;

          const slide = pptx.addSlide();
          const title = categoryInfo.title;
          const description = categoryInfo.description;
          slide.addShape(pptx.shapes.RECTANGLE, {
            x: "0%",
            y: "0%",
            w: "100%",
            h: "15%",
            fill: "FFCC01",
          });
          slide.addText(
            [
              {
                text: ` ${title}`,
                options: {
                  fontSize: 18,
                  bold: true,
                  color: "000000",
                },
              },
            ],
            {
              x: "0%",
              y: "3%",
            }
          );
          slide.addText(description, {
            x: "1%",
            y: "8%",
            fontSize: 12,
            color: "FF0000",
          });
          const logoPath = path.join(
            "C:",
            "Users",
            "Administrator",
            "Desktop",
            "UploadedFiles",
            "battery",
            "irancell.png"
          );

          slide.addImage({
            path: logoPath,
            x: "87%",
            y: "1%",
            w: "13%",
            h: "13%",
          });
          const categoryDirectory = path.join(baseDirectory, `${category}`);

          if (fs.existsSync(categoryDirectory)) {
            addImagesToSlide(slide, categoryDirectory);
          }
        }
        const pptxFileName = `${siteID}.pptx`;
        const pptxFilePath = path.join(baseDirectory, pptxFileName);
        pptx.writeFile({ fileName: pptxFilePath });

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
