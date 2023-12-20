import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { path: filePath, file } = req.query;
    const fullPath = path.join(
      "C:/Users/Administrator/Desktop/UploadedFiles",
      filePath as string,
      file as string
    );

    const fileStream = fs.createReadStream(fullPath);
    res.setHeader("Content-Disposition", `attachment; filename=${file}`);
    res.setHeader("Content-Type", "application/octet-stream");
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
