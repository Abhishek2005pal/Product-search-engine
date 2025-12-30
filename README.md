# Image-Based Product Search Engine

A full-stack application that allows users to search for products by uploading images. Uses Google Gemini Vision API for image analysis and MongoDB for product storage and search.

## Tech Stack

- **Frontend**: React.js + Ant Design + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **AI Vision**: Google Gemini Vision API
- **HTTP Client**: Axios

## Features

- Upload images (JPG/PNG) via drag & drop
- AI-powered image analysis using Google Gemini
- Intelligent product search based on extracted tags
- Responsive, modern UI with Ant Design
- MongoDB text search with relevance ranking

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- Google Gemini API key

### Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

3. Create `.env` file in root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product_search
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Seed the database with sample products:
```bash
npm run seed
```

### Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
npm run client
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── uploadController.js
│   │   └── searchController.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   └── searchRoutes.js
│   ├── services/
│   │   └── geminiService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── scripts/
│   │   └── seed.js
│   ├── app.js
│   └── server.js
└── client/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── styles/
        ├── App.jsx
        └── main.jsx
```

## API Endpoints

### POST /api/upload
Upload an image for analysis.

**Request**: multipart/form-data with `image` field

**Response**:
```json
{
  "success": true,
  "data": {
    "tags": ["tag1", "tag2"],
    "labels": ["label1"],
    "category": "electronics",
    "attributes": {...}
  }
}
```

### POST /api/search
Search products by tags.

**Request**:
```json
{
  "tags": ["tag1", "tag2"],
  "category": "electronics"
}
```

**Response**:
```json
{
  "success": true,
  "data": [...products],
  "count": 10
}
```

## License

ISC

