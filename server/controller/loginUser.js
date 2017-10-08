const User = require('../models/user')

module.exports = (req, res) => {
  const { email, password } = req.body
  User.findByCredentials(email, password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user)
      })
    })
    .catch((err) => res.status(400).send())
}
