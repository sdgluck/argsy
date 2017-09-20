function message (type, name, name2) {
  return 'Expecting '
    + (name ? name + ' to be ' : '')
    + type
    + (name && name2 ? ' ' + name2 : '')
}

module.exports = {
  ok (val, name) {
    if (!val) {
      throw new Error(message('ok', name))
    }
  },
  notOk (val, name) {
    if (val) {
      throw new Error(message('not ok', name))
    }
  },
  str (val, name) {
    if (typeof val !== 'string') {
      throw new Error(message('string', name))
    }
  },
  obj (val, name) {
    if (typeof val !== 'object' || Array.isArray(val)) {
      throw new Error(message('object', name))
    }
  },
  arr (val, name) {
    if (!Array.isArray(val)) {
      throw new Error(message('array', name))
    }
  },
  nonEmptyStr (val, name) {
    if (typeof val !== 'string' || !val.length) {
      throw new Error(message('non-empty string', name))
    }
  },
  num (val, name) {
    if (typeof val !== 'number' || Number.isNaN(val)) {
      throw new Error(message('number', name))
    }
  },
  nan (val, name) {
    if (!Number.isNaN(val)) {
      throw new Error(message('NaN', name))
    }
  },
  sym (val, name) {
    if (typeof val !== 'symbol') {
      throw new Error(message('symbol', name))
    }
  },
  int (val, name) {
    if (typeof val !== 'number' || val % 1 !== 0) {
      throw new Error(message('integer', name))
    }
  },
  bool (val, name) {
    if (typeof val !== 'boolean') {
      throw new Error(message('boolean', name))
    }
  },
  undef (val, name) {
    if (typeof val !== 'undefined') {
      throw new Error(message('undefined', name))
    }
  },
  null (val, name) {
    if (val !== null) {
      throw new Error(message('null', name))
    }
  },
  elem (val, arr, name, name2) {
    if (arr.indexOf(val) === -1) {
      throw new Error(message('element of array', name, name2))
    }
  },
  key (val, obj, name, name2) {
    if (!(val in obj)) {
      throw new Error(message('key of object', name, name2))
    }
  },
  fn (val, name) {
    if (typeof val !== 'function') {
      throw new Error(message('function', name))
    }
  }
}
