import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { path: requestedPath } = req.query;
    const basePath = "C:/Users/Administrator/Desktop/UploadedFiles";
    const fullPath = path.join(basePath, requestedPath as string);

    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      const files = await fs.readdir(fullPath);
      const formattedFiles = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(fullPath, file);
          const fileStats = await fs.stat(filePath);
          return {
            name: file,
            type: fileStats.isDirectory() ? "directory" : "file",
            size: fileStats.size,
            modified: fileStats.mtime,
          };
        })
      );

      res.json({ type: "directory", files: formattedFiles });
    } else {
      res.json({ type: "file" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
