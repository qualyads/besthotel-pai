const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Cache static assets for 1 year (images, css, js, fonts)
const cacheOptions = {
  maxAge: '1y',
  etag: true
};

// Serve static files
app.use(express.static(__dirname, {
  extensions: ['html'],
  ...cacheOptions
}));

// Handle clean URLs (without .html extension)
app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1) {
    const file = path.join(__dirname, req.path + '.html');
    res.sendFile(file, (err) => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Best Hotel Pai server running on port ${PORT}`);
});
