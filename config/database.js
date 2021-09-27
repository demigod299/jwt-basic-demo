const mongoose = require("mongoose");
const chalk = require('chalk');

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

exports.connect = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
};
