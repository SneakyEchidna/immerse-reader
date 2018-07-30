const express = require('express');
const path = require('path');
const { addWordtoStore, getWordFromStore } = require('./firebase');
const { scrape, addWord } = require('./parser');

const app = express();
app.set('view engine', 'pug');
app.use('/api/:word', (req, res, next) => {
  console.log('Requested word:', req.params.word);
  next();
});
app.use('/definitions/:word', (req, res, next) => {
  console.log('Requested word:', req.params.word);
  next();
});
scrape();

const port = process.env.PORT || 5000;

const definitionRoute = (req, res) => {
  getWordFromStore(req.params.word).then((cachedDef) => {
    if (cachedDef) {
      res.send(cachedDef);
    } else {
      const def = (defs) => {
        addWordtoStore(req.params.word, defs);
        res.send(defs);
      };
      addWord(req.params.word, def);
    }
  });
};
const renderDefRoute = (req, res) => {
  getWordFromStore(req.params.word).then((defs) => {
    if (defs) {
      res.render('index', { defs, word: req.params.word });
    } else {
      const def = (defs) => {
        addWordtoStore(req.params.word, defs);
        res.render('index', { defs, word: req.params.word });
      };
      addWord(req.params.word, def);
    }
  });
};
app.get('/api/:word/', definitionRoute);
app.get('/definitions/:word', renderDefRoute);
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`listening to ${port}`));
