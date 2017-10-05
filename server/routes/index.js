const { createTodo, getTodos, getTodo } = require('../controller')

module.exports = (app) => {
  app.post('/todos', createTodo)
  app.get('/todos', getTodos)
  app.get('/todos/:id', getTodo)
}
