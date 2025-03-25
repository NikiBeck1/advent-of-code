var fs = require('fs')
var data = fs.readFileSync('2015/03/2015-03.data').toString()

function floors(directions) {
  let x = 0
  let y = 0

  let houses = new Set()
  houses.add([0, 0].join(','))

  directions.split('').forEach((move) => {
    if (move === '>') x++
    if (move === '<') x--
    if (move === '^') y++
    if (move === 'v') y--

    houses.add([x, y].join(','))
  })

  return houses.size
}

console.log(floors(data))
