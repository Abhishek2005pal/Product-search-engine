import React from 'react';
import { Card, Tag } from 'antd';
import '../styles/ProductCard.css';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      className="product-card card-shadow"
      cover={
        <div className="product-image-wrapper">
          <img
            alt={product.name}
            src={product.imageUrl}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
        </div>
      }
    >
      <Meta
        title={<span className="product-name">{product.name}</span>}
        description={
          <div>
            <p className="product-description">{product.description}</p>
            {product.category && (
              <Tag color="purple" className="product-category">
                {product.category}
              </Tag>
            )}
            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <Tag key={index} className="product-tag">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;

