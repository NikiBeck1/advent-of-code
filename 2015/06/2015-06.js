var fs = require('fs')
var data = fs.readFileSync('2015/06/2015-06.data').toString()

function lightCount(str) {
  let grid = Array.from({ length: 1000 }, () => Array(1000).fill(false))
  let instructions = str.trim().split('\n')

  for (let line of instructions) {
    let match = line.match(/(\d+),(\d+) through (\d+),(\d+)/)
    if (!match) continue

    const [x1, y1, x2, y2] = match.slice(1).map(Number)

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (line.startsWith('turn on')) {
          grid[x][y] = true
        } else if (line.startsWith('turn off')) {
          grid[x][y] = false
        } else if (line.startsWith('toggle')) {
          grid[x][y] = !grid[x][y]
        }
      }
    }
  }

  let onCount = 0
  for (let row of grid) {
    for (let light of row) {
      if (light) onCount++
    }
  }

  return onCount
}

console.log(lightCount(data))
