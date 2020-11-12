const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//app.use(express.static('client/dist/'));

app.listen(port, () => {
  console.log(`Reviews server listening at http://localhost:${port}`);
});