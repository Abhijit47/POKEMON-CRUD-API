const mongoose = require('mongoose');
const { Schema } = mongoose;
// console.log(Schema);

const pokemonSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: "String",
    required: true,
  },
  url: {
    type: "String",
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);