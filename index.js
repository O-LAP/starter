const path = require('path');
const express = require('express');
const app = express();
const getPort = require('get-port');



async function rundev() {

  const PORT = await getPort({port: getPort.makeRange(3000, 3100)});

  app.use('/', express.static('node_modules/olap-core/'));
  app.use(express.static('design'));

  app.get('/dev', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app.html'));
  });

  app.get('*', function(req, res){
    res.status(404).send('Not found');
  });

  app.listen(PORT, () => {
    console.log(`Listening on: localhost:${PORT}`);
  });


}


rundev();

