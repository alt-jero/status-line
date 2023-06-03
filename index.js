// Constants
const ESCAPE_CHR = `\x1b`
const CR_CHR = `\r`
const CLEAR_LINE_SEQ = `${ESCAPE_CHR}[2K${CR_CHR}`

// Fit status line to width of display
// (preserves likely important info at start and end of line)
const abbrevFromCenter = (value, width) => {
  if(value.length < width) return value
  const valueStart = value.slice(0, width / 2 - 3)
  const valueEnd = value.slice(value.length - width / 2 + 3)
  return `${valueStart} … ${valueEnd}`
}

// Set/overwrite bottom line of console display
function statusLine(value = '') {
  const width = process.stdout.columns
  process.stdout.write(`${CLEAR_LINE_SEQ}${abbrevFromCenter(value, width)}${CR_CHR}`)
}

// Write a non-ephemeral line to the display (fast)
statusLine.logString = log => {
  process.stdout.write(`${CLEAR_LINE_SEQ}${log}\n`)
}

// Write via console.log while taking status line into account.
statusLine.log= log => {
  process.stdout.write(CLEAR_LINE_SEQ)
  console.log(log)
}

// Write out an error report to the display
statusLine.error = e => {
  process.stdout.write(CLEAR_LINE_SEQ);
  console.error(e);
}

module.exports = statusLine