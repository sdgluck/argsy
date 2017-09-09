'use strict'

function th (type, name, name2) {
  return new Error(
    'Expecting '
    + (name ? name + ' to be ' : '')
    + type
    + (name && name2 ? ' ' + name2 : '')
  )
}

var assert = module.exports = {
  ok: function (val, name) {
    if (!val) {
      throw th('ok', name)
    }
    return assert
  },
  notOk: function (val, name) {
    if (val) {
      throw th('not ok', name)
    }
    return assert
  },
  str: function (val, name) {
    if (typeof val !== 'string') {
      throw th('string', name)
    }
    return assert
  },
  obj: function (val, name) {
    if (
      typeof val !== 'object'
      || Object.prototype.toString.call(val) === '[object Array]'
    ) {
      throw th('object', name)
    }
    return assert
  },
  arr: function (val, name) {
    if (Object.prototype.toString.call(val) === '[object Array]') {
      throw th('array', name)
    }
    return assert
  },
  nonEmptyStr: function (val, name) {
    if (typeof val !== 'string' || !val.length) {
      throw th('non-empty string', name)
    }
    return assert
  },
  num: function (val, name) {
    if (typeof val !== 'number') {
      throw th('number', name)
    }
    return assert
  },
  sym: function (val, name) {
    if (typeof val !== 'symbol') {
      throw th('symbol', name)
    }
    return assert
  },
  int: function (val, name) {
    if (typeof val !== 'number' || val % 1 !== 0) {
      throw th('integer', name)
    }
    return assert
  },
  bool: function (val, name) {
    if (typeof val !== 'boolean') {
      throw th('boolean', name)
    }
    return assert
  },
  undef: function (val, name) {
    if (typeof val !== 'undefined') {
      throw th('undefined', name)
    }
    return assert
  },
  null: function (val, name) {
  if (val !== null) {
    throw th('null', name)
  }
  return assert
},
  elem: function (val, arr, name, name2) {
    if (arr.indexOf(val) === -1) {
      throw th('element of array', name, name2)
    }
    return assert
  },
  key: function (val, obj, name, name2) {
    if (!(val in obj)) {
      throw th('key of object', name, name2)
    }
    return assert
  },
  fn: function (val, name) {
    if (typeof val !== 'function') {
      throw th('function', name)
    }
    return assert
  }
}
