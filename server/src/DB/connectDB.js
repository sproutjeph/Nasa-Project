const mongoose = require("mongoose");

async function connectDb(URI) {
  mongoose.connect(URI);
}

async function closeDb() {
  await mongoose.connection.close();
}

module.exports = {
  connectDb,
  closeDb,
};
