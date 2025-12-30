require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY is not set in environment variables');
} else {
  console.log('✅ GEMINI_API_KEY is loaded (length: ' + process.env.GEMINI_API_KEY.length + ')');
}

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

