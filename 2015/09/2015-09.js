const fs = require('fs')
const { endianness } = require('os')
const data = fs.readFileSync('2015/09/2015-09.data').toString()

function shortestDistance(str) {
  const [routePart, instructions] = str.split('=').map((s) => s.trim())
  const [city1, city2] = routePart.split('to').map((city) => city.trim())

  const numberMatch = instructions.match(/\d+/)
  const distance = numberMatch ? Number(numberMatch[0]) : NaN

  return {
    city1,
    city2,
    distance,
  }
}

function canCalculate(instruction) {
  if (instruction.city1 && instruction.city2 && instruction.distance) {
    return true
  } else {
    return false
  }
}

function calculateRoutes(data) {
  if (data.length === 1) return [data]

  let result = []

  for (let i = 0; i < data.length; i++) {
    const current = data[i]
    const remaining = data.slice(0, i).concat(data.slice(i + 1))
    const remainingPerms = calculateRoutes(remaining)

    for (let perm of remainingPerms) {
      result.push([current, ...perm])
    }
  }
  return result
}

function buildDistanceMap(instructions) {
  const map = {}

  for (const { city1, city2, distance } of instructions) {
    if (!map[city1]) map[city1] = {}
    if (!map[city2]) map[city2] = {}
    map[city1][city2] = distance
    map[city2][city1] = distance
  }

  return map
}

function getRouteDistance(route, distanceMap) {
  let total = 0

  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i]
    const to = route[i + 1]

    const distance = distanceMap[from][to]
    if (distance === undefined) return Infinity // missing path (just in case)

    total += distance
  }

  return total
}

function findShortestAndLongest(routes, distanceMap) {
  let shortest = Infinity
  let longest = -Infinity
  let shortestRoute = []
  let longestRoute = []

  for (let route of routes) {
    let total = getRouteDistance(route, distanceMap)

    if (total < shortest) {
      shortest = total
      shortestRoute = route
    }

    if (total > longest) {
      longest = total
      longestRoute = route
    }
  }

  return {
    shortest,
    shortestRoute,
    longest,
    longestRoute,
  }
}

const instructions = data.trim().split('\n').map(shortestDistance)
const validInstructions = instructions.filter(canCalculate)

// Build city list
const allCities = new Set()
validInstructions.forEach(({ city1, city2 }) => {
  allCities.add(city1)
  allCities.add(city2)
})
const cityList = Array.from(allCities)

// Generate all route permutations
const allRoutes = calculateRoutes(cityList)

// Build the distance lookup map
const distanceMap = buildDistanceMap(validInstructions)

// Compute shortest/longest routes
const result = findShortestAndLongest(allRoutes, distanceMap)

// ✅ Now log everything
console.log('Parsed instructions:', instructions)
console.log('Valid instructions:', validInstructions)
console.log('City list:', cityList)
console.log('All possible routes:', allRoutes)
console.log('Shortest route:', result.shortestRoute, '=', result.shortest)
console.log('Longest route:', result.longestRoute, '=', result.longest)
