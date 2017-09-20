'use strict'

module.exports = argsy

const stackTrace = require('stack-trace')
const {Error} = require('error-clean-stack')

const asserts = require('./create-asserts')

let nextIsOptional = false

const optionalPropDefinition = [
  'optional',
  {
    enumerable: true,
    get: function () {
      nextIsOptional = true
      return this
    }
  }
]

Object.defineProperty(argsy, ...optionalPropDefinition)

for (const method in asserts) {
  argsy[method] = assertionWrapper(asserts[method], argsy)
  Object.defineProperty(argsy[method], ...optionalPropDefinition)
}

function assertionWrapper (assert, ret) {
  return (val, ...args) => {
    if (nextIsOptional) {
      nextIsOptional = false
      if (typeof val === 'undefined') {
        return ret
      }
    }
    assert(val, ...args)
    return ret
  }
}

function argsy (caller = '') {
  asserts.str(caller, 'caller')

  const errors = []

  const instance = {
    $: evaluate,
    $eval: evaluate,
    $evalIndexed: () => evaluate(true)
  }

  Object.assign(instance, asserts)

  for (const method in asserts) {
    const orig = instance[method]

    instance[method] = assertionWrapper((...args) => {
      try {
        orig(...args)
      } catch (err) {
        errors.push(err.message)
      }
      return instance
    }, instance)

    Object.defineProperty(instance[method], ...optionalPropDefinition)
  }

  Object.defineProperty(instance, ...optionalPropDefinition)

  return instance

  function evaluate (indexed) {
    if (errors.length) {
      const trace = stackTrace.get()

      let error = 'Failed argument assertions in call to'
        + ` "${caller || trace[1].getFunctionName()}"`
        + ` at ${trace[1].getFileName()}:${trace[1].getLineNumber()}:`

      errors.forEach((message, i) => {
        message = message[0].toLowerCase() + message.substr(1)
        error += indexed  ? `\n  ${i}: ${message}` : `\n  - ` + message
      })

      throw new Error(error)
    }
  }
}
