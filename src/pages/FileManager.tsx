import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFolder, FiFile, FiDownload } from "react-icons/fi";
import { AdminLayout } from "@layout";
import { userService } from "src/services";
import JSZip from 'jszip';

const FileManager: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const userRole = userService.getRole();

  useEffect(() => {
    fetchFiles();
  }, [currentPath, userRole]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/files?path=${currentPath}`);
      const filteredFiles = filterFiles(response.data.files);
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterFiles = (files) => {
    return files.filter((file) => {
      const fileName = file.name.toLowerCase();
      const allowedRoles: Record<string, string[]> = {
        battery: ["Programmer"],
        cm: ["Programmer"],
      };
      return (
        !allowedRoles[fileName] || allowedRoles[fileName].includes(userRole)
      );
    });
  };

  const handleFolderClick = (folderName: string) => {
    const newPath = `${currentPath}${folderName}/`;
    setCurrentPath(newPath);
  };

  const handleFileDownload = async (fileName: string) => {
    setLoading(true);
    try {
      const downloadUrl = `/api/download?path=${currentPath}&file=${fileName}`;
      const response = await axios.get(downloadUrl, { responseType: "blob" });

      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.setAttribute("download", fileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderDownload = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/zip?path=${currentPath}`, {
        responseType: "blob",
      });

      const zip = new JSZip();
      zip.file(`${currentPath.substring(1)}.zip`, response.data);

      zip.generateAsync({ type: "blob" }).then((content) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(content);
        downloadLink.setAttribute(
          "download",
          `${currentPath.substring(1)}.zip`
        );
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    } catch (error) {
      console.error("Error zipping and downloading folder:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    const parentPath = currentPath.split("/").slice(0, -2).join("/") + "/";
    setCurrentPath(parentPath);
  };

  return (
    <AdminLayout>
      <div className=" text-white">
        <div className="mb-4 flex items-center">
          <button onClick={handleBackButtonClick} className="text-blue-500">
            {"< Back"}
          </button>
          <h1 className="text-3xl font-bold ml-4">File Manager</h1>
        </div>

        <div className="mt-4">
          {loading && (
            <div className="loader-container">
              <span className="loader"></span>{" "}
            </div>
          )}
          {!loading && (!files || files.length === 0) && <p>No files found.</p>}
          {!loading && files && files.length > 0 && (
            <div>
              <button
                onClick={handleFolderDownload}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download Folder as Zip
              </button>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="p-4 border border-gray-600 rounded cursor-pointer hover:bg-gray-700"
                    onClick={() =>
                      file.type === "directory"
                        ? handleFolderClick(file.name)
                        : handleFileDownload(file.name)
                    }
                  >
                    {file.type === "directory" ? (
                      <FiFolder size={36} className="text-blue-500" />
                    ) : (
                      <FiFile size={36} className="text-gray-500" />
                    )}
                    <p className="mt-2">{file.name}</p>
                    {file.type === "file" && (
                      <div className="flex items-center mt-2">
                        <FiDownload size={24} className="mr-2" />
                        <span>Download</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default FileManager;
