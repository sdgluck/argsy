#!/usr/bin/env node
'use strict'

const assert = require('../src')

function add (a, b) {
  assert('add')
    .num(a, 'a')
    .num(b, 'b')
    .$eval()
  return a + b
}

const a = Number(process.argv[2])
const b = Number(process.argv[3])
const result = add(a, b)

console.log(a + '+' + b + '=' + result)
