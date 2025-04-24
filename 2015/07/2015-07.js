const { trace } = require('console')
const fs = require('fs')
const data = fs.readFileSync('2015/07/2015-07.data').toString()

let equations = {
  AND: (operandOne, operandTwo) => operandOne & operandTwo,
  OR: (operandOne, operandTwo) => operandOne | operandTwo,
  LSHIFT: (operandOne, operandTwo) => operandOne << operandTwo,
  RSHIFT: (operandOne, operandTwo) => operandOne >> operandTwo,
  NOT: (operand) => ~operand,
  SET: (operand) => operand,
}

let types = [
  'AND',
  'OR',
  'LSHIFT',
  'MUL',
  'RSHIFT',
  'DIV',
  'SUB',
  'ADD',
  'XAND',
  'XOR',
  'SET',
  'NOT',
]

function parseInstruction(line) {
  let [input, output] = line.split('->').map((part) => part.trim())
  let type = null
  let operands = []

  for (let op of Object.keys(equations)) {
    if (input.includes(` ${op} `)) {
      type = op
      operands = input.split(` ${op} `).map((part) => part.trim())
      break
    }
  }
  //
  if (!type) {
    if (input.match('SET')) {
      type = 'SET'
      operands = [input]
    }
  }

  return {
    output: output,
    type: type,
    operands: operands,
  }
}

let wireMap = {}
function buildInstructions(input) {
  let lines = input
    .trim()
    .split('\n')
    .map((line) => parseInstruction(line))

  return lines
}

function checkForNum(params) {
  return params.match(/^\d+$/)
}

function canCalculate(instruction) {
  return getValuesForInstruction(instruction).every(
    (value) => value !== undefined,
  )
}

function calculate(instruction) {
  if (canCalculate(instruction)) {
    if (types.includes(instruction.type)) {
      let [operandOne, operandTwo] = getValuesForInstruction(instruction)
      let equation = equations[instruction.type]
      let output = equation(operandOne, operandTwo)
      wireMap[instruction.output] = output
      return true
    }
  }
  return false
}

function getValue(operand) {
  if (operand.match(/^\d+$/)) {
    return Number(operand)
  } else if (operand.match(/[a-zA-Z]/) && wireMap[operand] !== undefined) {
    return Number(wireMap[operand])
  }
  return undefined
}

function getValuesForInstruction(instruction) {
  let values = instruction.operands.map((operand) => getValue(operand))
  return [...values]
}

instructions = buildInstructions(data)
let unresolved = [...instructions]
let didSomething = true

while (didSomething) {
  didSomething = false

  for (let i = 0; i < unresolved.length; i++) {
    const instruction = unresolved[i]

    if (calculate(instruction)) {
      unresolved.splice(i, 1)
      i--
      didSomething = true
    }
  }
}

console.log(wireMap)
console.log(instructions)
