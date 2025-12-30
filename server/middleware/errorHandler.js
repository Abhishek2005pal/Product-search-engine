const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File too large. Maximum size is 10MB.',
    });
  }

  if (err.message.includes('MulterError')) {
    return res.status(400).json({
      success: false,
      error: 'File upload error: ' + err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;

