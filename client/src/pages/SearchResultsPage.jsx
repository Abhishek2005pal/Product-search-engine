import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Empty, Tag, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';
import '../styles/SearchResultsPage.css';

const { Meta } = Card;

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products = [], searchTags = [], category, imagePreview } = location.state || {};

  if (!location.state) {
    return (
      <div className="results-page">
        <div className="results-content">
          <Empty description="No search results found. Please upload an image first." />
          <Button type="primary" onClick={() => navigate('/')} style={{ marginTop: 20 }}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-content">
        <div className="results-header">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            className="back-button"
          >
            New Search
          </Button>

          {imagePreview && (
            <div className="search-image-preview">
              <img src={imagePreview} alt="Search" />
            </div>
          )}

          <div className="search-info">
            <h2 className="results-title">
              {products.length > 0 ? `Found ${products.length} Products` : 'No Products Found'}
            </h2>
            {searchTags.length > 0 && (
              <div className="search-tags">
                <span className="tags-label">Search tags:</span>
                {searchTags.slice(0, 10).map((tag, index) => (
                  <Tag key={index} color="blue">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
            {category && (
              <Tag color="purple" className="category-tag">
                Category: {category}
              </Tag>
            )}
          </div>
        </div>

        {products.length > 0 ? (
          <Row gutter={[24, 24]} className="products-grid">
            {products.map((product, index) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                key={product._id || index}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="no-results-card">
            <Empty
              description="No products found matching your search. Try a different image."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

