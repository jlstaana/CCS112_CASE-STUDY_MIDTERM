import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import './FileUpload.css'; // Optional: Add styles for the upload component

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  const fileTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && fileTypes.includes(file.type)) {
      setSelectedFile(file);
      setMessage('');
    } else {
      setMessage('Please select a valid file type (JPEG, PNG, PDF).');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('/api/files/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      setMessage('File uploaded successfully!');
      setUploadProgress(0);
      setSelectedFile(null);
    } catch (error) {
      setMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      {message && <p className="message">{message}</p>}
      {uploadProgress > 0 && <ProgressBar progress={uploadProgress} />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;