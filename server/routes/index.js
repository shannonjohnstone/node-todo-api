const { createTodo } = require('../controller')

module.exports = (app) => {
  app.post('/todos', createTodo)
}
