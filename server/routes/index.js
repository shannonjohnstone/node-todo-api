const todos = require('./todos')
const users = require('./users')

module.exports = (app) => {
  todos(app)
  users(app)
}
