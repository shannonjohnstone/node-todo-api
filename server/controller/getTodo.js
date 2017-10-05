const { ObjectID  } = require('mongodb')
const Todos = require('../models/todos')

module.exports = (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) return res.status(404).send()
  Todos.findById(id)
    .then((todo) => {
      if (!todo) return res.status(404).send()
      res.send({ todo })
    })
    .catch((e) => res.status(400).send(e))
}