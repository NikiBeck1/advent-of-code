const fs = require('fs')
const { endianness } = require('os')
// const data = fs.readFileSync('2015/09/2015-09.data').toString()

/* Directions
- Passwords must include one increasing straight of at least three letters, 
like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
- Passwords may not contain the letters i, o, or l, as these letters can be mistaken 
for other characters and are therefore confusing.
- Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
- Password must be 8 characters long

For example:
- hijklmmn meets the first requirement (because it contains the straight hij) 
but fails the second requirement requirement (because it contains i and l).
- abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.
- abbcegjk fails the third requirement, because it only has one double letter (bb).
- The next password after abcdefgh is abcdffaa.
- The next password after ghijklmn is ghjaabcc, 
because you eventually skip all the passwords that start with ghi..., since i is not allowed.
*/

// param one
function includesStraight(str) {
  for (let i = 0; i < str.length - 2; i++) {
    let a = str.charCodeAt(i)
    let b = str.charCodeAt(i + 1)
    let c = str.charCodeAt(i + 2)

    if (b === a + 1 && c === b + 1) {
      return true
    }
  }
  return false
}

function hasDoubleLetters(str) {
  let count = 0
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      count++
      i++ // skip overlapping
    }
    if (count >= 2) return true
  }
  return false
}

function incrementStringManual(str) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let arr = str.split('')

  for (let i = arr.length - 1; i >= 0; i--) {
    let index = alphabet.indexOf(arr[i])
    if (index === -1) throw new Error('Invalid character found')

    if (arr[i] === 'z') {
      arr[i] = 'a'
    } else {
      arr[i] = alphabet[index + 1]
      break
    }
  }

  return arr.join('')
}

function findValidString(startStr) {
  let current = startStr

  while (true) {
    current = incrementStringManual(current)

    if (
      !/[ilo]/.test(current) &&
      hasDoubleLetters(current) &&
      includesStraight(current)
    ) {
      return current
    }
  }
}

console.log(findValidString('vzbxxyzz'))
