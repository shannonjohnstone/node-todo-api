const { createUser, findUser } = require('../controller')
const authenticate = require('../middleware/authenticate')

module.exports = (app) => {
  app.post('/users', createUser)
  app.get('/users/me', authenticate, findUser)
}
