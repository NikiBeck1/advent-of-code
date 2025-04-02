var fs = require('fs')
var data = fs.readFileSync('2015/05/2015-05.data').toString()

function isNice(str) {
  let strings = str.trim().split('\n')
  let niceCount = 0
  let vowels = ['a', 'e', 'i', 'o', 'u']
  let naughtyCombos = ['ab', 'cd', 'pq', 'xy']
  let doubleCombos = [
    'aa',
    'bb',
    'cc',
    'dd',
    'ee',
    'ff',
    'gg',
    'hh',
    'ii',
    'jj',
    'kk',
    'll',
    'mm',
    'nn',
    'oo',
    'pp',
    'qq',
    'rr',
    'ss',
    'tt',
    'uu',
    'vv',
    'ww',
    'xx',
    'yy',
    'zz',
  ]

  for (let line of strings) {
    let vowelCount = [...line].filter((char) => vowels.includes(char)).length
    let hasDoubleLetter = doubleCombos.some((pair) => line.includes(pair))
    let hasNaughtyCombo = naughtyCombos.some((pair) => line.includes(pair))

    if (vowelCount >= 3 && hasDoubleLetter && !hasNaughtyCombo) {
      niceCount++
    }
  }

  return niceCount
}

console.log(isNice(data))
