const Product = require('../models/Product');

const searchProducts = async (req, res, next) => {
  try {
    const { tags, category } = req.body;

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Tags array is required',
      });
    }

    const searchQuery = tags.join(' ');

    let query = {
      $text: { $search: searchQuery },
    };

    if (category && category !== 'general') {
      query.category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find(query, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);

    if (products.length === 0) {
      const fallbackQuery = {
        $or: [
          { tags: { $in: tags } },
          { category: { $regex: tags[0] || '', $options: 'i' } },
          { name: { $regex: tags[0] || '', $options: 'i' } },
        ],
      };

      const fallbackProducts = await Product.find(fallbackQuery).limit(20);
      return res.json({
        success: true,
        data: fallbackProducts,
        count: fallbackProducts.length,
      });
    }

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchProducts };

