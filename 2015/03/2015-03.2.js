var fs = require('fs')
var data = fs.readFileSync('2015/03/2015-03.data').toString()

function santaTurn(directions) {
  let santa = [0, 0]
  let roboSanta = [0, 0]
  let isSantaTurn = true

  let houses = new Set()
  houses.add([0, 0].join(','))

  directions.split('').forEach((move) => {
    let currentMove = isSantaTurn ? santa : roboSanta

    if (move === '>') currentMove[0]++
    if (move === '<') currentMove[0]--
    if (move === '^') currentMove[1]++
    if (move === 'v') currentMove[1]--

    houses.add(currentMove.join(','))
    isSantaTurn = !isSantaTurn
  })

  return houses.size
}

console.log(santaTurn(data))
