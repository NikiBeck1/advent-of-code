var fs = require('fs')
var data = fs.readFileSync('2015/05/2015-05.data').toString()

function isNice(str) {
  let niceCount = 0
  let strings = str.trim().split('\n')

  for (let line of strings) {
    let hasDoubleLetter = /(..).*\1/.test(line)
    let hasRepeatLetter = /(.).\1/.test(line)

    if (hasDoubleLetter && hasRepeatLetter) {
      niceCount++
    }
  }

  return niceCount
}

console.log(isNice(data))
