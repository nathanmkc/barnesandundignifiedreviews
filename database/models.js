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

  getAvg: (idObj, callback) => {
    Book.find(idObj)
    .then((results) => {
      var totalRating = results[0].reviews.reduce((acc, review) => {return acc + review.rating},0);
      var totalReviews = results[0].reviews.length;
      var avgRating = Number((totalRating/totalReviews).toFixed(1));
      var avgResults = {
        totalReviews: totalReviews,
        avgRating: avgRating
      }
      callback(null, avgResults)
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