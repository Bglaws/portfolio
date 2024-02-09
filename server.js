const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  // Serve static assets
  server.use(express.static('public'));

  // Handle all other requests using Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 5000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is listening on port ${port}`);
  });
});

