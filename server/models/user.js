const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    lowerCase: true,
    unique: true,
    validate: (email) => /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  }
})

module.exports = mongoose.model('User', UserSchema)
