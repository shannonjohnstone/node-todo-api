const { createTodo, getTodos, getTodo, deleteTodo } = require('../controller')

module.exports = (app) => {
  app.post('/todos', createTodo)
  app.get('/todos', getTodos)
  app.get('/todos/:id', getTodo)
  app.delete('/todos/:id', deleteTodo)
}
