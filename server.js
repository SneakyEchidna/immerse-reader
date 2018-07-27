const express = require('express');
const path = require('path');
const { scrape, addWord } = require('./parser');

const app = express();
scrape();

const port = process.env.PORT || 5000;
app.get('/api/:word/', (req, res) => {
  const def = defs => res.send(defs);
  addWord(req.params.word, def);
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`listening to ${port}`));
