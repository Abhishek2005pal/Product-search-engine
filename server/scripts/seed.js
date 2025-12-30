require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling over-ear headphones with 30-hour battery life. Perfect for music lovers and professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    tags: ['headphones', 'wireless', 'bluetooth', 'audio', 'music', 'electronics', 'black', 'noise-cancelling'],
    category: 'electronics',
  },
  {
    name: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    tags: ['watch', 'smartwatch', 'fitness', 'technology', 'wearable', 'black', 'silver'],
    category: 'electronics',
  },
  {
    name: 'Modern Coffee Maker',
    description: 'Automatic drip coffee maker with programmable timer and thermal carafe. Makes perfect coffee every morning.',
    imageUrl: 'https://images.unsplash.com/photo-1517668808823-f8a1ffb61201?w=500',
    tags: ['coffee', 'maker', 'kitchen', 'appliance', 'black', 'white', 'stainless steel'],
    category: 'appliances',
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Vintage-style denim jacket with comfortable fit. Perfect for casual wear in any season.',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    tags: ['jacket', 'denim', 'clothing', 'casual', 'blue', 'fashion'],
    category: 'clothing',
  },
  {
    name: 'Leather Crossbody Bag',
    description: 'Elegant leather handbag with adjustable strap. Spacious interior with multiple compartments.',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
    tags: ['bag', 'handbag', 'leather', 'accessories', 'brown', 'black', 'fashion'],
    category: 'accessories',
  },
  {
    name: 'Minimalist Desk Lamp',
    description: 'Sleek LED desk lamp with adjustable brightness and color temperature. Perfect for home office.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    tags: ['lamp', 'desk', 'lighting', 'LED', 'modern', 'white', 'black'],
    category: 'furniture',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight athletic shoes with cushioned sole and breathable mesh upper. Ideal for running and workouts.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    tags: ['shoes', 'sneakers', 'running', 'athletic', 'sports', 'white', 'black'],
    category: 'footwear',
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Compatible with all devices.',
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    tags: ['mouse', 'wireless', 'computer', 'peripheral', 'black', 'white', 'technology'],
    category: 'electronics',
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with extra cushioning. Suitable for yoga, pilates, and exercise routines.',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    tags: ['yoga', 'mat', 'fitness', 'exercise', 'purple', 'blue', 'pink'],
    category: 'fitness',
  },
  {
    name: 'Vintage Camera',
    description: 'Classic film camera with manual controls. Perfect for photography enthusiasts and collectors.',
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
    tags: ['camera', 'film', 'photography', 'vintage', 'black', 'silver'],
    category: 'electronics',
  },
  {
    name: 'Ceramic Plant Pot',
    description: 'Decorative ceramic planter with drainage holes. Great for indoor plants and home decoration.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    tags: ['pot', 'planter', 'ceramic', 'plants', 'home', 'decor', 'white', 'terracotta'],
    category: 'home',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    tags: ['bottle', 'water', 'stainless steel', 'insulated', 'silver', 'black'],
    category: 'accessories',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();

