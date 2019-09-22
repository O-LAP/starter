const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('*', function(req, res){
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Ready on localhost:${PORT}~...`);
});