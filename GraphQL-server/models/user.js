const mongoose = require('mongoose')
const mongooseUnique = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 5
  },
  favoriteGenre: {
    type: String,
    required: true
  }
}).plugin(mongooseUnique)

module.exports = mongoose.model('User', schema)
