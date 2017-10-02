const { MongoClient, ObjectID  } = require('mongodb')


const MONGODB_ADDRESS = 'mongodb://localhost:27017/todo-app'

MongoClient.connect(MONGODB_ADDRESS, (err, db) => {
  if (err) return console.log('Unable to connect to the MongoDB server')
  console.log('Connected to MongoDB server')

  db.collection('Todos')
    .insert([
      { name: 'Get milk', completed: false },
      { name: 'Feed dog', completed: false },
      { name: 'Go for run', completed: false },
      { name: 'Book dinner', completed: false },
    ],
    (err, result) => {
      if (err) return console.log('Unable to insert user', err)
      console.log(result.ops[0]._id.getTimestamp())
    })

  db.close()
})
