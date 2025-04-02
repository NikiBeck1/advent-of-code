var fs = require('fs')
const crypto = require('crypto')

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function floors(num, code) {
  let index = 0

  while (true) {
    let attempt = code + index
    let hash = md5(attempt)

    if (hash.startsWith(num)) {
      return index
    }

    index++
  }
}

console.log(floors('00000', 'ckczppom'))
