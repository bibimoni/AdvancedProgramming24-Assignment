const express = require('express');
const PORT = 8080;
const app = express();
const { DataHandler } = require('./processData');

let dataHandler;

const apiHandler = (item) => { 
  dataHandler = new DataHandler(item);
  
  app.get('/item/all', (req, res) => {
    res.status(200).send(
      item
    )
  });

  // /item?key=
  app.get('/item', (req, res) => {
    const key = req.query.key;
    if (key == undefined) {
      res.status(200).send({
        "comment:": "invalid key"
      })
    } else {
      res.status(200).send(
        dataHandler.searchByDetail({
          key: key
        })
      )
    }
  });

  // /item/debit?from=x&to=y
  app.get('/item/debit', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    res.status(200).send(
      dataHandler.searchByDebit({
        from: from,
        to: to
      })
    )
  });

  // /item/credit?from=x&to=y
  app.get('/item/credit', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    res.status(200).send(
      dataHandler.searchByCredit({
        from: from,
        to: to
      })
    )
  });

  // /item/transno?from=x&to=y
  app.get('/item/transno', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    res.status(200).send(
      dataHandler.searchByTransNo({
        from: from,
        to: to
      })
    )
  });

  // /item/date?from=x&to=y
  app.get('/item/date', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
    if (!regex.test(from) || !regex.test(to)) {
      res.status(200).send({
        "comment: " : "invalid date, date should have format of DD/MM/YYYY"
      })
    } else {
      res.status(200).send(
        dataHandler.searchByDate({
          from: from,
          to: to
        })
      )
    }

  });

  app.listen(
    PORT,
    () => console.log(`it's alive at http://localhost:${PORT}`)
  );
}

module.exports = { apiHandler };