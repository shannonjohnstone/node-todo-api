const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

const data = {
  id: 10
}

// .sign will sign take your data and the secret and return a toke that has been hashed and salted
const token = jwt.sign(data, '123abc')
console.log(token);
const decodedToken = jwt.verify(token, '123abc')
console.log(decodedToken);
