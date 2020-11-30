const Book = require('./Book.js');

const model = {
  get: (idObj, callback) => {
    Book.find(idObj)
      .then((results) => {
        callback(null, results);
      })
      .catch((err) => {
        callback(err);
      });
  },

  getAvg: (idObj, callback) => {
    Book.find(idObj)
      .then((results) => {
        const totalRating = results[0].reviews.reduce((acc, review) => acc + review.rating, 0);
        const totalReviews = results[0].reviews.length;
        const avgRating = Number((totalRating / totalReviews).toFixed(1));
        const avgResults = {
          totalReviews,
          avgRating,
        };
        callback(null, avgResults);
      })
      .catch((err) => {
        callback(err);
      });
  },

  put: (input, callback) => {
    if (input.type === 'yes') {
      Book.updateOne({ reviews: { $elemMatch: { _id: input.id } } }, { $inc: { 'reviews.$[element].helpfulYes': 1 } }, { arrayFilters: [{ 'element._id': input.id }] })
        .then((results) => {
          callback(null, results);
        });
    } else if (input.type === 'no') {
      Book.updateOne({ reviews: { $elemMatch: { _id: input.id } } }, { $inc: { 'reviews.$[element].helpfulNo': 1 } }, { arrayFilters: [{ 'element._id': input.id }] })
        .then((results) => {
          callback(null, results);
        });
    }
  },
};

module.exports = model;
