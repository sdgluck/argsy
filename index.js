function n (name) {
  return name ? name + ' to be ' : ''
}

function th (type, name) {
  return new Error('Expecting ' + n(name) + type)
}

var arse = module.exports = {
  ok: function (val, name) {
    if (!val) {
      throw th('ok', name)
    }
    return arse
  },
  notOk: function (val, name) {
    if (val) {
      throw th('not ok', name)
    }
    return arse
  },
  str: function (val, name) {
    if (typeof val !== 'string') {
      throw th('string', name)
    }
    return arse
  },
  obj: function (val, name) {
    if (typeof val !== 'object' || !!val.prototype) {
      throw th('object', name)
    }
    return arse
  },
  nonEmptyStr: function (val, name) {
    if (typeof val !== 'string' || !val.length) {
      throw th('non-empty string', name)
    }
    return arse
  },
  num: function (val, name) {
    if (typeof val !== 'number') {
      throw th('number', name)
    }
    return arse
  },
  sym: function (val, name) {
    if (typeof val !== 'symbol') {
      throw th('symbol', name)
    }
    return arse
  },
  int: function (val, name) {
    if (typeof val !== 'number' || val % 1 !== 0) {
      throw th('integer', name)
    }
    return arse
  },
  bool: function (val, name) {
    if (typeof val !== 'boolean') {
      throw th('boolean', name)
    }
    return arse
  },
  undef: function (val, name) {
    if (typeof val !== 'undefined') {
      throw th('undefined', name)
    }
    return arse
  },
  null: function (val, name) {
    if (val !== null) {
      throw th('null', name)
    }
    return arse
  }
}
