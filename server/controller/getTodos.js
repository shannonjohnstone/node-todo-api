const Todos = require('../models/todos')

module.exports = (req, res) => {
  Todos.find({
    _creator: req.user._id
  })
  .then((todos) => res.send({ todos }))
  .catch((e) => res.status(400).send(e))
}
