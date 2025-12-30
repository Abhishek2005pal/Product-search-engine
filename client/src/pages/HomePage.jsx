import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Upload, Button, message, Spin } from 'antd';
import { InboxOutlined, SearchOutlined } from '@ant-design/icons';
import { uploadImage, searchProducts } from '../services/api';
import '../styles/HomePage.css';

const { Dragger } = Upload;

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      message.warning('Please select an image first');
      return;
    }

    setLoading(true);

    try {
      const uploadResponse = await uploadImage(file);
      
      if (uploadResponse.success) {
        const { tags, category } = uploadResponse.data;
        
        const searchResponse = await searchProducts(tags, category);
        
        if (searchResponse.success) {
          navigate('/results', {
            state: {
              products: searchResponse.data,
              searchTags: tags,
              category: category,
              imagePreview: imagePreview,
            },
          });
        } else {
          message.error('Search failed. Please try again.');
        }
      } else {
        message.error('Image analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(error.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'image',
    multiple: false,
    accept: 'image/jpeg,image/png,image/jpg',
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG files!');
        return Upload.LIST_IGNORE;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null);
      setImagePreview(null);
    },
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Search Products Using Images</h1>
          <p className="home-subtitle">
            Upload an image and discover similar products using AI-powered visual search
          </p>
        </div>

        <Card className="upload-card card-shadow" bordered={false}>
          {imagePreview ? (
            <div className="image-preview-container">
              <div className="image-preview-wrapper">
                <img src={imagePreview} alt="Preview" className="image-preview" />
              </div>
              <div className="upload-actions">
                <Button
                  type="primary"
                  size="large"
                  icon={<SearchOutlined />}
                  onClick={handleUpload}
                  loading={loading}
                  className="search-button"
                >
                  Search Products
                </Button>
                <Button
                  onClick={() => {
                    setFile(null);
                    setImagePreview(null);
                  }}
                  disabled={loading}
                >
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <Dragger {...uploadProps} className="upload-dragger">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to this area to upload</p>
              <p className="ant-upload-hint">
                Support for JPG and PNG files only. Maximum file size: 10MB
              </p>
            </Dragger>
          )}

          {loading && (
            <div className="loading-overlay">
              <Spin size="large" tip="Analyzing image and searching products..." />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

