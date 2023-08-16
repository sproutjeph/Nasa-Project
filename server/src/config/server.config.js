const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
};
