const mongoose = require('mongoose')
const { Schema } = mongoose

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  complatedAt: {
    type: Number,
    default: null
  }
})

module.exports = mongoose.model('Todos', TodoSchema)
