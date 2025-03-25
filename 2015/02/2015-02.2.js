var fs = require('fs')
var data = fs.readFileSync('2015/02/2015-02.data').toString()

function floors(square) {
  // Grouping the values
  let measurements = square.toString()
  let nums = measurements.match(/\d+/g).map(Number)
  let grouped = []
  for (let i = 0; i < nums.length; i += 3) {
    if (nums.slice(i, i + 3).length === 3) {
      grouped.push(nums.slice(i, i + 3))
    }
  }

  let sum = grouped
    .map((singleGroup) => {
      let [l, w, h] = singleGroup
      let valueOne = Math.min(2 * (l + w), 2 * (w + h), 2 * (l + h))
      let valueTwo = l * w * h
      return valueOne + valueTwo
    })
    .reduce((acc, val) => acc + val, 0)

  return sum
}

console.log(floors(data))
