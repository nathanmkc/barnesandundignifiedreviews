const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/dist/'));

app.get('/reviews/:ISBN', (req, res) => {
  res.end();
})

app.put('/reviews/:ISBN/yes/:id', (req, res) => {
  res.end();
})

app.put('/reviews/:ISBN/no/:id', (req, res) => {
  res.end();
})

app.listen(port, () => {
  console.log(`Reviews server listening at http://localhost:${port}`);
});