const express = require('express');
const app = express();
const model = require('../database/models.js');
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/dist/'));

app.get('/books/:identifier/reviews', (req, res) => {
  if (Number.isNaN(Number(req.params.identifier))) {
    model.get({title: req.params.identifier}, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    model.get({ISBN: req.params.identifier}, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data[0].reviews);
      }
    });
  }
})

app.get('/books/:identifier/reviews/summary', (req, res) => {
  if (Number.isNaN(Number(req.params.identifier))) {
    model.getAvg({title: req.params.identifier}, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    model.getAvg({ISBN: req.params.identifier}, (err, data) => {
      if (err) {
        res.status(400).send('Controller: Error in get');
      } else {
        res.status(200).send(data);
      }
    });
  }
})

app.put('/books/:identifier/review/:id', (req, res) => {
  if (Number.isNaN(Number(req.params.identifier))) {
    console.log(typeof(req.params.identifier));
    console.log(req.params.identifier);
  } else {
    console.log(typeof(Number(req.params.identifier)));
    console.log(Number(req.params.identifier));
    console.log((req.params.id))
    console.log(req.body);
  }
  res.end();
})

app.listen(port, () => {
  console.log(`Reviews server listening at http://localhost:${port}`);
});