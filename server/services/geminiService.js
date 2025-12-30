const fs = require('fs').promises;
const { GoogleGenerativeAI } = require('@google/generative-ai');

const extractTagsFromImage = async (imagePath) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('GEMINI_API_KEY is not set or empty');
    }

    // Initialize Google AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const imageData = await fs.readFile(imagePath);
    const base64Image = imageData.toString('base64');

    const mimeType = imagePath.toLowerCase().endsWith('.png')
      ? 'image/png'
      : 'image/jpeg';

    const prompt = `Analyze the image and extract product-related information.
Return ONLY valid JSON in this format:

{
  "labels": ["object1", "object2"],
  "attributes": {
    "colors": ["color1", "color2"],
    "materials": ["material1"],
    "style": "style description"
  },
  "category": "category name",
  "tags": ["tag1", "tag2", "tag3"]
}`;

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
      },
    ];

    // Try multiple models based on available list
    // Based on debug output, this user has access to 2.0 and 2.5 series
    const modelsToTry = [
      "gemini-2.0-flash", 
      "gemini-2.5-flash", 
      "gemini-flash-latest",
      "gemini-1.5-flash" // Keep as fallback just in case
    ];
    let result;
    let lastError;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying Gemini model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent([prompt, ...imageParts]);
        break; // If successful, exit loop
      } catch (error) {
        console.warn(`Model ${modelName} failed: ${error.message.split('\n')[0]}`);
        lastError = error;
      }
    }

    if (!result) {
      throw lastError || new Error('All Gemini models failed');
    }

    const response = await result.response;
    const text = response.text();

    let parsedResponse;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      parsedResponse = JSON.parse(jsonMatch[0]);
    } catch {
      const fallbackTags = text.toLowerCase().match(/\b\w+\b/g) || [];
      parsedResponse = {
        labels: fallbackTags.slice(0, 5),
        attributes: { colors: [], materials: [], style: 'unknown' },
        category: 'general',
        tags: fallbackTags.slice(0, 10),
      };
    }

    const allTags = [
      ...(parsedResponse.labels || []),
      ...(parsedResponse.attributes?.colors || []),
      ...(parsedResponse.attributes?.materials || []),
      parsedResponse.category,
      ...(parsedResponse.tags || []),
    ]
      .filter(Boolean)
      .map(tag => tag.toLowerCase());

    return {
      labels: parsedResponse.labels || [],
      attributes: parsedResponse.attributes || {},
      category: parsedResponse.category || 'general',
      tags: [...new Set(allTags)],
    };
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw new Error('Failed to analyze image: ' + error.message);
  }
};

module.exports = { extractTagsFromImage };
