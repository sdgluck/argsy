function typeOf (val) {
  if (Array.isArray(val)) {
    return 'array'
  }
  return typeof val
}

function message (type, name, name2) {
  return 'Expecting '
    + (name ? name + ' to be ' : '')
    + type
    + (name && name2 ? ' ' + name2 : '')
}

module.exports = function (ret) {
  return {
    ok (val, name) {
      if (!val) {
        throw new Error(message('ok', name))
      }
      return ret
    },
    notOk (val, name) {
      if (val) {
        throw new Error(message('not ok', name))
      }
      return ret
    },
    str (val, name) {
      if (typeof val !== 'string') {
        throw new Error(message('string', name))
      }
      return ret
    },
    obj (val, name) {
      if (typeof val !== 'object' || Array.isArray(val)) {
        throw new Error(message('object', name))
      }
      return ret
    },
    arr (val, name) {
      if (!Array.isArray(val)) {
        throw new Error(message('array', name))
      }
      return ret
    },
    nonEmptyStr (val, name) {
      if (typeof val !== 'string' || !val.length) {
        throw new Error(message('non-empty string', name))
      }
      return ret
    },
    num (val, name) {
      if (typeof val !== 'number' || Number.isNaN(val)) {
        throw new Error(message('number', name))
      }
      return ret
    },
    nan (val, name) {
      if (!Number.isNaN(val)) {
        throw new Error(message('NaN', name))
      }
      return ret
    },
    sym (val, name) {
      if (typeof val !== 'symbol') {
        throw new Error(message('symbol', name))
      }
      return ret
    },
    int (val, name) {
      if (typeof val !== 'number' || val % 1 !== 0) {
        throw new Error(message('integer', name))
      }
      return ret
    },
    bool (val, name) {
      if (typeof val !== 'boolean') {
        throw new Error(message('boolean', name))
      }
      return ret
    },
    undef (val, name) {
      if (typeof val !== 'undefined') {
        throw new Error(message('undefined', name))
      }
      return ret
    },
    null (val, name) {
      if (val !== null) {
        throw new Error(message('null', name))
      }
      return ret
    },
    elem (val, arr, name, name2) {
      if (arr.indexOf(val) === -1) {
        throw new Error(message('element of array', name, name2))
      }
      return ret
    },
    key (val, obj, name, name2) {
      if (!(val in obj)) {
        throw new Error(message('key of object', name, name2))
      }
      return ret
    },
    fn (val, name) {
      if (typeof val !== 'function') {
        throw new Error(message('function', name))
      }
      return ret
    }
  }
}
