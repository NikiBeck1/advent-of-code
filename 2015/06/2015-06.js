var fs = require('fs')
var data = fs.readFileSync('2015/06/2015-06.data').toString()

function floors(str) {
  let instructions = str.trim().split('\n')
  let totalLights = []
  let isToggle = true

  for (let line of instructions) {
    let lightsOff = /\boff\b/i.test(line)
    let lightsOn = /\bon\b/i.test(line)
    let lightsToggle = /\btoggle\b/i.test(line)
    let numbers = (line.match(/\d+/g) || []).map(Number)

    if (lightsOff) {
      totalLights.push(numbers[1] - numbers[0])
    } else if (lightsOn) {
      totalLights.push(numbers[1] + numbers[0])
    } else if (lightsToggle === isToggle) {
      totalLights.push(numbers[1] + numbers[0])
      isToggle = !isToggle
    }
  }
  return totalLights
}

console.log(floors(data))
