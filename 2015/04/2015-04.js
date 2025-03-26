var fs = require('fs')
const crypto = require('crypto')

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function floors() {
  let index = 0
  let secretCode = 'ckczppom'

  while (true) {
    let attempt = secretCode + index
    let hash = md5(attempt)

    if (hash.startsWith('00000')) {
      return index
    }

    index++
  }
}

console.log(floors())
