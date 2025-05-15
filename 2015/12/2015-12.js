const fs = require('fs')
const { endianness } = require('os')
const data = fs.readFileSync('2015/12/2015-12.data').toString()

function balancingBooks(data) {
  const parsed = JSON.parse(data)

  function walk(value) {
    if (typeof value === 'number') {
      return value
    }

    if (Array.isArray(value)) {
      return value.reduce((sum, item) => sum + walk(item), 0)
    }

    if (typeof value === 'object' && value !== null) {
      // If any value is "red", skip the entire object
      if (Object.values(value).includes('red')) {
        return 0
      }
      return Object.values(value).reduce((sum, item) => sum + walk(item), 0)
    }

    // Ignore strings and other types
    return 0
  }

  return walk(parsed)
}

console.log(balancingBooks(data))
