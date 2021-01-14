const mongoose = require('mongoose');

const mongoUri = 'mongodb://username:password@18.220.174.46:27017/barnesandundignified';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;
