const { SHA256 } = require('crypto-js')

const message = 'I am user number 3'
const hash = SHA256(message).toString()

console.log(`Message: ${message}`)
console.log(`Hash: ${hash}`)

const data = {
  id: 4
}

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// middleman attack from client mock
// we can pick up on this attack becasue we are using a salt 'somesecret' and becasue the attacker does not know this salt we can see the attempted change
token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()


const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

if (resultHash === token.hash) console.log('Data was not changed')
else console.log('Data was changed. Do not trust')
