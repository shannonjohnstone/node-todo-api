const { MongoClient, ObjectID  } = require('mongodb')


const MONGODB_ADDRESS = 'mongodb://localhost:27017/todo-app'

MongoClient.connect(MONGODB_ADDRESS, (err, db) => {
  if (err) return console.log('Unable to connect to the MongoDB server')
  console.log('Connected to MongoDB server')

  db.collection('Todos').deleteMany({ 'Book dinner' })
  db.close()
})
