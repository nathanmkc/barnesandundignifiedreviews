const mongoose = require('mongoose');

const mongoUri = 'mongodb://nathan:sillysyl8@18.220.174.46:27017/barnesandundignified';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;
