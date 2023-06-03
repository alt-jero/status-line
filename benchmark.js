const statusLine = require('.')
const ht = process.hrtime

const iterations = 250000
const testOutput = 'Running benchmark...'

const iterationsText = String(iterations)
  .split('')
  .reverse()
  .map((char, i) => (i + 1) % 3 === 0 ? `,${char}` : char)
  .reverse()
  .join('')
  .split('')
  .filter((char, i) => i > 0 || char !== ',')
  .join('')


function timeFor(usingFunction) {
  const startTime = ht()
  for(let i = 0; i < iterations; i++) {
    usingFunction(testOutput)
  }
  const htResult = ht(startTime)
  return Number(`${htResult[0]}.${String(htResult[1]).padStart(9, '0')}`)
}

const results = [
  ['process.stdout        ', timeFor( (output) => process.stdout.write(`${output}\n`) )],
  ['statusLine()          ', timeFor( statusLine )],
  ['statusLine.logString()', timeFor( statusLine.logString )],
  ['console.log()         ', timeFor( console.log )],
  ['statusLine.log()      ', timeFor( statusLine.log )],
]

statusLine.logString(`The following have been benchmarked with ${iterationsText} iterations:`)
results
  .sort(([_, a], [__, b]) => a < b)
  .forEach(([name, timeTaken], i) => statusLine.logString(`${i+1}. ${name} took ${timeTaken} seconds`))

