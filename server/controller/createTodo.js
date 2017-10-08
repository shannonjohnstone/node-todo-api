const Todos = require('../models/todos')

module.exports = (req, res) => {
  const todo = new Todos({ text: req.body.text, _creator: req.user._id })
  todo.save().then(todoItem => res.send(todoItem), (e) => res.status(400).send(e))
}
