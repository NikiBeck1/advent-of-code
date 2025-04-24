const data = '1113222113'

function doubleNum(data) {
  let result = ''
  let i = 0

  while (i < data.length) {
    let count = 1
    let current = data[i]

    while (i + 1 < data.length && data[i] === data[i + 1]) {
      count++
      i++
    }

    result += count + current
    i++
  }

  return result
}

let current = data
for (let i = 0; i < 50; i++) {
  current = doubleNum(current)
}

console.log('Length after 40 iterations:', current.length)
