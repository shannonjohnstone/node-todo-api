const User = require('../models/user')

module.exports = (req, res) => res.send(req.user)
