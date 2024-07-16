// src/FileCompressor.tsx
import React, { useState, ChangeEvent } from 'react';
import JSZip from 'jszip';

const FileCompressor: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleCompressFiles = async () => {
    if (!files || files.length === 0) {
      alert('No files selected!');
      return;
    }

    const zip = new JSZip();

    Array.from(files).forEach((file) => {
      const filePath = file.webkitRelativePath || file.name;
      zip.file(filePath, file);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'compressed_files.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating zip file:', error);
    }
  };

  return (
    <div>
      <h1>Compress Files or Folders</h1>
      <input
        type="file"
        multiple
        // @ts-ignore
        webkitdirectory="true"
        onChange={handleFileChange}
      />
      <button onClick={handleCompressFiles}>Compress Files</button>
    </div>
  );
};

export default FileCompressor;
