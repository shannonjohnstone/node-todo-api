const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    trim: true,
    lowerCase: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  const user = this
  const { _id, email } = user.toObject()
  return { _id, email }
}

UserSchema.methods.generateAuthToken = function () {
    const user = this
    const access = 'auth'

    // using the users id to generate their token
    const token = jwt.sign({ _id: user._id.toHexString() }, 'abc123').toString()
    user.tokens.push({
      access,
      token
    })

    return user.save().then(() => token)
}

UserSchema.statics.findByToken = function (token) {
  const User = this
  let decoded

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    return Promise.reject()
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

module.exports = mongoose.model('User', UserSchema)
