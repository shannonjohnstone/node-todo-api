const { MongoClient, ObjectID  } = require('mongodb')


const MONGODB_ADDRESS = 'mongodb://localhost:27017/todo-app'

MongoClient.connect(MONGODB_ADDRESS, (err, db) => {
  if (err) return console.log('Unable to connect to the MongoDB server')
  console.log('Connected to MongoDB server')

  // db.collection('todos').find({
  //   _id: new ObjectID('59d0855a3382c73603df9add')
  // }).toArray()
  //   .then(results => {
  //     console.log(JSON.stringify(results, undefined, 2))
  //   }, (err) => {
  //     console.log('Unable to find Todos');
  //   })
  //
  // db.collection('todos').count()
  //   .then(count => {
  //     console.log(`Connt is: ${count}`)
  //   }, (err) => {
  //     console.log('Unable to find Todos');
  //   })

  db.collection('Users')
    .find({ location: 'helensburgh' })
    .toArray()
    .then(results => {
      console.log(JSON.stringify(results, undefined, 2))
    }, err => {
      console.log('Unable to find');
    })
  db.close()
})
