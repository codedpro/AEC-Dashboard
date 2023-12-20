import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from "formidable";
import * as XLSX from "xlsx";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "8mb",
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, filename } = req.query;

  if (action === "list") {
    try {
      const files = await fs.readdir(
        "C:\\Users\\Administrator\\Desktop\\UploadedFiles\\DSM"
      );
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: "Error listing files" });
    }


  } else if (action === 'upload') {
    let status = 200;
    let resultBody = {
      status: 'ok',
      message: 'Files were uploaded successfully',
    };

    try {
      const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
          files.push([field, file]);
        });
        form.on('end', () => resolve(files));
        form.on('error', (err) => reject(err));
        form.parse(req, () => {
          //
        });
      });

      if (files?.length) {
        const targetPath = path.join('C:\\Users\\Administrator\\Desktop\\UploadedFiles\\DSM');
        try {
          await fs.access(targetPath);
        } catch (e) {
          await fs.mkdir(targetPath, { recursive: true });
        }

        for (const file of files) {
          const tempPath = file[1].filepath;
          const targetFilePath = path.join(targetPath, file[1].originalFilename);

          await fs.copyFile(tempPath, targetFilePath);
          await fs.unlink(tempPath);
        }
      }
    } catch (error) {
      console.error(error);
      status = 500;
      resultBody = { status: 'fail', message: 'Upload error' };
    }

  } else if (action === "update") {
    if (!filename || !updatedFilename) {
      res
        .status(400)
        .json({ error: "Original and updated filenames are required" });
      return;
    }

    const filePath = path.join(
      "C:\\Users\\Administrator\\Desktop\\UploadedFiles\\DSM",
      filename
    );
    const updatedFilePath = path.join(
      "C:\\Users\\Administrator\\Desktop\\UploadedFiles\\DSM",
      updatedFilename
    );

    try {
      await fs.rename(filePath, updatedFilePath);
      res
        .status(200)
        .json({ status: "ok", message: "Filename updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating filename" });
    }
  } else if (action === "load-and-process") {
    const targetFilename = filename || "R1_DSM Source-18 Jul.xlsb";
    const filePath = path.join(
      "C:\\Users\\Administrator\\Desktop\\UploadedFiles\\DSM",
      targetFilename
    );
    try {
      const data = await fs.readFile(filePath);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetNames = workbook.SheetNames;

      const excelData = sheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        }) as string[][];
      });

      res.status(200).json(excelData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error loading and processing file" });
    }
  } else {
    res.status(400).json({ error: "Invalid action" });
  }
};

export default handler;
