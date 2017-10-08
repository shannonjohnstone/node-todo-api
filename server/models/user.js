const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
    const token = jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET).toString()
    user.tokens.push({
      access,
      token
    })

    return user.save().then(() => token)
}

UserSchema.methods.removeToken = function (token) {
  const user = this
  return user.update({ $pull: { tokens: { token } } })
}

UserSchema.statics.findByToken = function (token) {
  const User = this
  let decoded

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return Promise.reject()
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this

  return User.findOne({ email })
    .then((user) => {
      if (!user) return Promise.reject()

      return new Promise((resolve, reject) => {
        return bcrypt.compare(password, user.password, (err, isUser) => {
          if (isUser) return resolve(user)
          return reject()
        })
      })
    })
}

UserSchema.pre('save', function (next) {
  const user = this

  function hashPassword() {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  }

  if (user.isModified('password')) hashPassword()
  else next()
})

module.exports = mongoose.model('User', UserSchema)
