const express = require('express');
const PORT = 8080;
const app = express();
const { DataHandler } = require('./processData');

let dataHandler;

const apiHandler = (item) => { 
  dataHandler = new DataHandler(item);
  
  app.get('/item', (req, res) => {
    res.status(200).send(
      item
    )
  });

  app.listen(
    PORT,
    () => console.log(`it's alive at http://localhost:${PORT}`)
  );
}

module.exports = { apiHandler };