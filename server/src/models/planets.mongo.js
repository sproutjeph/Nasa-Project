const mongoose = require("mongoose");

const palnetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", palnetSchema);
