const express = require('express');
const parse = require('./parser');
const app = express();

const port = process.env.PORT || 5000;
app.get('/api/:word/', (req, res) => {
  parse(req.params.word).then(data => {
    console.log(data)
    res.send(data);
  });
});
app.listen(port, () => console.log(`listening to ${port}`));
