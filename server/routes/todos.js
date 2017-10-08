const { createTodo, getTodos, getTodo, deleteTodo } = require('../controller')
const authenticate = require('../middleware/authenticate')

module.exports = (app) => {
  app.post('/todos', authenticate, createTodo)
  app.get('/todos', authenticate, getTodos)
  app.get('/todos/:id', authenticate, getTodo)
  app.delete('/todos/:id', authenticate, deleteTodo)
}
