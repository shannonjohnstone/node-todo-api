const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const Todo = require('../../models/todos')
const User = require('../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [{
  _id: userOneId,
  email: 'tester.good@test.com.au',
  password: 'userOnePassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'tester.bad@test.com.au',
  password: 'userTwoPassword',
}]

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo'
  }
]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(() => done())
  })
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save()
    const userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => done())
}
module.exports = {
  todos,
  users,
  populateTodos,
  populateUsers
}
