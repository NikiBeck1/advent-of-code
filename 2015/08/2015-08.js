const fs = require('fs')
const { endianness } = require('os')
const data = fs.readFileSync('2015/08/2015-08.data').toString()

function findCharacters(str) {
  const lines = str.trim().split('\n')

  let codeTotal = 0
  let memoryTotal = 0
  let encodedTotal = 0

  for (let line of lines) {
    codeTotal += line.length
    memoryTotal += eval(line).length

    let encoded = line.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    encoded = `"${encoded}"`
    encodedTotal += encoded.length
  }

  return {
    codeChars: codeTotal,
    memoryChars: memoryTotal,
    difference: codeTotal - memoryTotal,
    encoded: encodedTotal - codeTotal,
  }
}

console.log(findCharacters(data))
