const { MongoClient, ObjectID  } = require('mongodb')


const MONGODB_ADDRESS = 'mongodb://localhost:27017/todo-app'

MongoClient.connect(MONGODB_ADDRESS, (err, db) => {
  if (err) return console.log('Unable to connect to the MongoDB server')
  console.log('Connected to MongoDB server')

  db.collection('Users')
    .insert([
      { name: 'fox', location: 'otford' },
      { name: 'ziggy', location: 'otford' },
      { name: 'emily', location: 'otford' },
      { name: 'dustin', location: 'otford' },
      { name: 'lusas', location: 'helensburgh' },
      { name: 'aiden', location: 'helensburgh' }
    ],
    (err, result) => {
      if (err) return console.log('Unable to insert user', err)
      console.log(result.ops[0]._id.getTimestamp())
    })

  db.close()
})
