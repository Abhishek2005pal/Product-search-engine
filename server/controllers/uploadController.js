const { extractTagsFromImage } = require('../services/geminiService');
const fs = require('fs').promises;
const path = require('path');

const uploadAndAnalyze = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided',
      });
    }

    const imagePath = req.file.path;

    try {
      const analysis = await extractTagsFromImage(imagePath);

      await fs.unlink(imagePath).catch(() => {});

      res.json({
        success: true,
        data: {
          tags: analysis.tags,
          labels: analysis.labels,
          category: analysis.category,
          attributes: analysis.attributes,
        },
      });
    } catch (analysisError) {
      await fs.unlink(imagePath).catch(() => {});
      throw analysisError;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadAndAnalyze };

