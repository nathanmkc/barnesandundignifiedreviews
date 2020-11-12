const Book = require('./Book.js');

const model = {
  get: (idObj, callback) => {
    Book.find(idObj)
    .then((results) => {
      callback(null, results)
    })
    .catch((err) => {
      callback(err);
    })
  },

  update: (request, callback) => {
    console.log(request.body)
    console.log(request.params.id)
    db.query(
      `UPDATE Items SET quantity = ${request.body.newQuantity} WHERE id = ${request.params.id}`,
      (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      }
    );
  },
};

module.exports = model;