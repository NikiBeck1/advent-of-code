var fs = require('fs')
var data = fs.readFileSync('2015/01/2015-01.data').toString()

var test = {
  a: +2,
  f: -5,
  '(': +1,
  ')': -1,
}

function floors(p) {
  console.log(p)
  var total = p.split('').reduce((acc, val) => {
    return acc + test[val]
  }, 0)

  return total
}

console.log(floors(data))
