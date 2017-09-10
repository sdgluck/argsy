'use strict'

module.exports = argsy

const stackTrace = require('stack-trace')
const {Error} = require('error-clean-stack')

const asserts = require('./create-asserts')(argsy)

const optionalPropDefinition = ['optional', {
  enumerable: true,
  get: () => {
    nextIsOptional = true
    return asserts
  }
}]

let nextIsOptional = false

Object.keys(asserts).forEach((method) => {
  const orig = asserts[method]
  asserts[method] = assertionWrapper(orig)
  Object.defineProperty(asserts[method], ...optionalPropDefinition)
})

Object.assign(argsy, asserts)

Object.defineProperty(argsy, ...optionalPropDefinition)

function assertionWrapper (assert) {
  return function (val, ...args) {
    if (nextIsOptional) {
      nextIsOptional = false
      if (typeof val !== 'undefined') {
        return assert(val, ...args)
      } else {
        return argsy
      }
    }
    return assert(val, ...args)
  }
}

function argsy (caller = '') {
  asserts.str(caller, 'caller')

  const errors = []

  function evaluate (indexed) {
    if (errors.length) {
      const trace = stackTrace.get()

      let error = 'Failed argument assertions in call to'
        + ` "${caller || trace[1].getFunctionName()}"`
        + ` at ${trace[1].getFileName()}:${trace[1].getLineNumber()}:`

      errors.forEach((message, i) => {
        message = message[0].toLowerCase() + message.substr(1)
        message = indexed ? `${i}: ${message}` : message
        error += `\n  - ` + message
      })

      throw new Error(error)
    }
  }

  argsy.$ = argsy.$eval = evaluate
  argsy.$evalIndexed = evaluate.bind(null, true)

  Object.keys(asserts).forEach((method) => {
    argsy[method] = function () {
      try {
        asserts[method].apply(null, arguments)
      } catch (err) {
        errors.push(err.message)
      }
      return argsy
    }
    return argsy
  })

  return argsy
}
