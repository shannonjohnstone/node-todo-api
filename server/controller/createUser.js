const { ObjectID  } = require('mongodb')
const User = require('../models/user')

module.exports = (req, res) => {
  const { email, password } = req.body
  const user =  new User({ email, password })
  user.save()
    .then(() => user.generateAuthToken()) // this returns the generated token)
    .then(token => res.header('x-auth', token).send(user))
    .catch(e => res.status(400).send(e))
}
