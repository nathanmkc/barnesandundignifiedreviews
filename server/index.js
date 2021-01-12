const express = require('express');
const cors = require('cors');

const app = express();
const model = require('../database/models.js');

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/public/'));
app.use(cors());

app.get('/books/:identifier/reviews', (req, res) => {
  if (Number.isNaN(Number(req.params.identifier))) {
    model.get({ title: req.params.identifier }, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    model.get({ ISBN: req.params.identifier }, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data[0].reviews);
      }
    });
  }
});

app.get('/books/:identifier/reviews/summary', (req, res) => {
  if (Number.isNaN(Number(req.params.identifier))) {
    model.getAvg({ title: req.params.identifier }, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    model.getAvg({ ISBN: req.params.identifier }, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.put('/books/:identifier/review/:id', (req, res) => {
  if (Number.isNaN(Number(req.params.identifier))) {
    model.put({ title: req.params.identifier, type: req.body.type, id: req.params.id }, (err) => {
      if (err) {
        res.status(400).send('Controller: Error in put');
      } else {
        res.status(200).end();
      }
    });
  } else {
    model.put({ ISBN: req.params.identifier, type: req.body.type, id: req.params.id }, (err) => {
      if (err) {
        res.status(400).send('Controller: Error in put');
      } else {
        res.status(200).end();
      }
    });
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Reviews server listening at http://3.140.58.207:${port}`);
});
