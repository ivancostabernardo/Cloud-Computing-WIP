'use client';
import { useState } from 'react';

export default function PDFUploader() {
  const [wordCount, setWordCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setIsLoading(true);
    setFileName(file.name);
    setWordCount(null);

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/count-words', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setWordCount(data.wordCount);
      } else {
        throw new Error('Failed to process PDF');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing PDF file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">PDF Word Counter</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF File
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={isLoading}
        />
      </div>

      {isLoading && (
        <div className="text-blue-600 text-center">Processing PDF...</div>
      )}

      {wordCount !== null && !isLoading && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">Results for: {fileName}</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            Word Count: {wordCount.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
