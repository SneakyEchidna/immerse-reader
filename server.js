const express = require('express');
const { scrape, addWord } = require('./parser');

const app = express();
scrape();

const port = process.env.PORT || 5000;
app.get('/api/:word/', (req, res) => {
  const def = defs => res.send(defs);
  addWord(req.params.word, def);
});
app.listen(port, () => console.log(`listening to ${port}`));
