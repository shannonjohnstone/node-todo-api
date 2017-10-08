const { createUser, findUser, loginUser, deleteUser } = require('../controller')
const authenticate = require('../middleware/authenticate')

module.exports = (app) => {
  app.post('/users', createUser)
  app.get('/users/me', authenticate, findUser)
  app.delete('/users/me/token', authenticate, deleteUser)
  app.post('/users/login', loginUser)
}
