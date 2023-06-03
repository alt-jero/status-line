# StatusLine

## Introduction
This tiny package was an attempt to create a simple way of adding a status line at the bottom of a console when running node.js code in a CLI environment.

## Installation

```bash
$ npm i @alt-jero/status-line
```

## Usage
```javascript
const statusLine = require('@alt-jero/status-line');

// Set/overwrite bottom line of console display
statusLine(`I'm really-fast, but ephemeral.`)

// Write a non-ephemeral line to the display (fast)
statusLine.logString(`I'm fast and stay in your line-buffer.`)

// Write via console.log while taking status line into account (slower)
statusLine.log(`I'm slower, but can handle objects and arrays.`)

// Write out an error report to the display
statusLine.error(new Error(`We'll see a stack-trace without the status line getting involved!`))
```

## Benchmark
 I have attempted to make it as fast as possible without sacrificing utility. To that end, it's possible to use the normal  `.log()` and `.error()` methods which forward the given data to `console.log()` and `console.error()` respectively after clearing the status line. In the interest of speed, it's also possible to use the `.logString()` method if you know you just want to write a string. The latter method uses `process.stdout.write()` in the background, also taking the presence of the status line into account.

 Below is the result of a benchmark run on my own computer: A macbook air from mid-2013 (I know, dinosaur xD) with the i7 processor and 8GiB RAM. The results show the difference in speed is miniscule.

> The following have been benchmarked with 250,000 iterations:
> 1. process.stdout         took 1.771997629 seconds
> 2. statusLine()           took 1.462698296 seconds
> 3. statusLine.logString() took 2.345646944 seconds
> 4. console.log()          took 2.327852828 seconds
> 5. statusLine.log()       took 3.441730405 seconds


If you want to run the benchmark yourself, first **be warned that the benchmark will obliterate the contents of your line buffer**, as it needs to output about 1.25M lines of `Running benchmark...` in order to complete the test. 
You can run the benchmark like so:
```bash
$ npm run test
```
