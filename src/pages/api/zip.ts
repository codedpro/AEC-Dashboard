import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { path: folderPath } = req.query;
    
    if (!folderPath) {
      throw new Error('Invalid path');
    }

    const fullPath = path.join('C:/Users/Administrator/Desktop/UploadedFiles', folderPath as string);

    const zip = new AdmZip();
    zip.addLocalFolder(fullPath);

    const zipBuffer = zip.toBuffer();
    res.setHeader('Content-Disposition', `attachment; filename=${folderPath}.zip`);
    res.setHeader('Content-Type', 'application/zip');
    res.end(zipBuffer);
  } catch (error) {
    console.error('Error downloading folder as zip:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
