import { useState } from 'react';

export const useImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setLoading(false);
  };

  return {
    file,
    preview,
    loading,
    setLoading,
    handleFileSelect,
    reset,
  };
};

