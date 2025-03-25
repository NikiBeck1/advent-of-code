var fs = require('fs')
var data = fs.readFileSync('2015/02/2015-02.data').toString()

function floors(square) {
  // Grouping the values
  let grouped = square
    .trim()
    .split('\n')
    .map((singleGroup) => singleGroup.split('x').map(Number))

  console.log(grouped)

  let smallestValues = grouped
    .map((singleGroup) => {
      let [l, w, h] = singleGroup
      return Math.min(l * w, w * h, h * l)
    })
    .reduce((acc, val) => acc + val, 0)

  // Sorting values to find each side and the smallest value
  let length = grouped.map((singleGroup) => singleGroup[0] * singleGroup[1] * 2)
  let width = grouped.map((singleGroup) => singleGroup[1] * singleGroup[2] * 2)
  let height = grouped.map((singleGroup) => singleGroup[0] * singleGroup[2] * 2)

  let sum =
    length.reduce((acc, val) => acc + val, 0) +
    width.reduce((acc, val) => acc + val, 0) +
    height.reduce((acc, val) => acc + val, 0) +
    smallestValues

  return sum
}

console.log(floors(data))
