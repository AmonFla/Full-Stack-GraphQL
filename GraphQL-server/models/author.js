const mongoose = require('mongoose')
const mongooseUnique = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  born: {
    type: Number,
    default: null
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
}).plugin(mongooseUnique)

module.exports = mongoose.model('Author', schema)
