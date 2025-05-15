const fs = require('fs')
const { endianness } = require('os')
const data = fs.readFileSync('2015/14/2015-14.data').toString()

function fastestReindeerPart2(data, totalTime) {
  const lines = data.trim().split('\n')

  const reindeerStats = lines.map((line) => {
    const parts = line.split(' ')
    const name = parts[0]
    const speed = parseInt(parts[3], 10)
    const flyTime = parseInt(parts[6], 10)
    const restTime = parseInt(parts[13], 10)

    return {
      name,
      speed,
      flyTime,
      restTime,
      distance: 0,
      flyTimer: flyTime,
      restTimer: 0,
      isFlying: true,
      points: 0,
    }
  })

  for (let second = 1; second <= totalTime; second++) {
    for (let r of reindeerStats) {
      if (r.isFlying) {
        r.distance += r.speed
        r.flyTimer--
        if (r.flyTimer === 0) {
          r.isFlying = false
          r.restTimer = r.restTime
        }
      } else {
        r.restTimer--
        if (r.restTimer === 0) {
          r.isFlying = true
          r.flyTimer = r.flyTime
        }
      }
    }
    const maxDistance = Math.max(...reindeerStats.map((r) => r.distance))

    for (let r of reindeerStats) {
      if (r.distance === maxDistance) {
        r.points++
      }
    }
  }

  let winner = reindeerStats.reduce((max, r) =>
    r.points > max.points ? r : max,
  )

  return { name: winner.name, points: winner.points }
}

const result = fastestReindeerPart2(data, 2503)
console.log(`${result.name} has ${result.points} points.`)
