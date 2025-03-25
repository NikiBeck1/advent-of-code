var fs = require('fs')
var data = fs.readFileSync('2015/01/2015-01.data').toString()

var test = {
  '(': +1,
  ')': -1,
}

function floors(p) {
  let position
  var total = p.split('').reduce((acc, val, index) => {
    if (acc >= 0) {
      return acc + test[val]
    } else {
      return (position = index)
    }
  }, 0)

  return position
}

console.log(floors(data))
