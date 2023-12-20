import type { NextPage } from 'next';
import React, { useState, useRef } from 'react';

const FileUpload: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!inputFileRef.current?.files?.length) {
            alert('Please select a file to upload.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        Object.values(inputFileRef.current.files).forEach((file) => {
            formData.append('file', file);
        });

        try {
            const response = await fetch('/api/uploadfile', {
                method: 'POST',
                body: formData,
            });

            const body = await response.json();
            
            if (response.ok) {
                alert('File uploaded successfully.');
            } else {
                alert('Error uploading file: ' + body.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while uploading the file.');
        }

        setIsLoading(false);
    };

    return (
        <form>
            <div>
                <input type="file" name="myfile" ref={inputFileRef} multiple />
            </div>
            <div>
                <input
                    type="submit"
                    value="Upload"
                    disabled={isLoading}
                    onClick={handleOnClick}
                />
                {isLoading && ` Please wait...`}
            </div>
        </form>
    );
};

export default FileUpload;
