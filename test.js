const assert = require('./')

describe('argsy', () => {
  describe('standalone asserts', () => {
    it('asserts ok good', () => expect(() => assert.ok(true, 'value')).not.toThrow())
    it('asserts ok bad', () => expect(() => assert.ok(false, 'value')).toThrowError(/expecting value to be ok/i))
    it('asserts ok, no name', () => expect(() => assert.ok(false)).toThrowError(/expecting ok/i))
    it('asserts ok, optional, without value', () => expect(() => assert.optional.ok()).not.toThrowError(/expecting ok/i))
    it('asserts ok, optional, with value', () => expect(() => assert.optional.ok(false)).toThrowError(/expecting ok/i))

    it('asserts notOk good', () => expect(() => assert.notOk(false)).not.toThrow())
    it('asserts notOk bad', () => expect(() => assert.notOk(true, 'value')).toThrowError(/expecting value to be not ok/i))
    it('asserts notOk, no name', () => expect(() => assert.notOk(true)).toThrowError(/expecting not ok/i))

    it('asserts str good', () => expect(() => assert.str('')).not.toThrow())
    it('asserts str bad', () => expect(() => assert.str(0, 'value')).toThrowError(/expecting value to be string/i))
    it('asserts str, no name', () => expect(() => assert.str(0)).toThrowError(/expecting string/i))

    it('asserts obj good', () => expect(() => assert.obj({})).not.toThrow())
    it('asserts obj bad', () => expect(() => assert.obj([], 'value')).toThrowError(/expecting value to be object/i))
    it('asserts obj, no name', () => expect(() => assert.obj(0)).toThrowError(/expecting object/i))

    it('asserts nonEmptyStr good', () => expect(() => assert.nonEmptyStr(' ')).not.toThrow())
    it('asserts nonEmptyStr bad', () => expect(() => assert.nonEmptyStr('', 'value')).toThrowError(/expecting value to be non-empty string/i))
    it('asserts nonEmptyStr, no name', () => expect(() => assert.nonEmptyStr('')).toThrowError(/expecting non-empty string/i))

    it('asserts num good', () => expect(() => assert.num(0)).not.toThrow())
    it('asserts num bad', () => expect(() => assert.num('', 'value')).toThrowError(/expecting value to be number/i))
    it('asserts num, no name', () => expect(() => assert.num('')).toThrowError(/expecting number/i))

    it('asserts NaN good', () => expect(() => assert.nan(NaN)).not.toThrow())
    it('asserts NaN bad', () => expect(() => assert.nan('', 'value')).toThrowError(/expecting value to be NaN/i))
    it('asserts NaN, no name', () => expect(() => assert.nan('')).toThrowError(/expecting NaN/i))

    it('asserts sym good', () => expect(() => assert.sym(Symbol())).not.toThrow())
    it('asserts sym bad', () => expect(() => assert.sym('', 'value')).toThrowError(/expecting value to be symbol/i))
    it('asserts sym, no name', () => expect(() => assert.sym('')).toThrowError(/expecting symbol/i))

    it('asserts int good', () => expect(() => assert.int(100)).not.toThrow())
    it('asserts int bad', () => expect(() => assert.int(1.5, 'value')).toThrowError(/expecting value to be integer/i))
    it('asserts int, no name', () => expect(() => assert.int(1.5)).toThrowError(/expecting integer/i))

    it('asserts bool good', () => expect(() => assert.bool(true)).not.toThrow())
    it('asserts bool bad', () => expect(() => assert.bool(1.5, 'value')).toThrowError(/expecting value to be boolean/i))
    it('asserts bool, no name', () => expect(() => assert.bool(1.5)).toThrowError(/expecting boolean/i))

    it('asserts undef good', () => expect(() => assert.undef(undefined)).not.toThrow())
    it('asserts undef bad', () => expect(() => assert.undef(1.5, 'value')).toThrowError(/expecting value to be undefined/i))
    it('asserts undef, no name', () => expect(() => assert.undef(1.5)).toThrowError(/expecting undefined/i))

    it('asserts null good', () => expect(() => assert.null(null)).not.toThrow())
    it('asserts null bad', () => expect(() => assert.null(1.5, 'value')).toThrowError(/expecting value to be null/i))
    it('asserts null, no name', () => expect(() => assert.null(1.5)).toThrowError(/expecting null/i))

    it('asserts elem good', () => expect(() => assert.elem('', [''])).not.toThrow())
    it('asserts elem bad', () => expect(() => assert.elem('', [], 'value', 'my collection')).toThrowError(/expecting value to be element of array my collection/i))
    it('asserts elem, no name', () => expect(() => assert.elem('', [])).toThrowError(/expecting element of array/i))

    it('asserts key good', () => expect(() => assert.key('key', {key: ''})).not.toThrow())
    it('asserts key bad', () => expect(() => assert.key('key', {}, 'value', 'spongebob')).toThrowError(/expecting value to be key of object spongebob/i))
    it('asserts key, no name', () => expect(() => assert.key('key', {})).toThrowError(/expecting key of object/i))

    it('asserts fn good', () => expect(() => assert.fn(() => {}, 'value')).not.toThrow())
    it('asserts fn bad', () => expect(() => assert.fn(false, 'value')).toThrowError(/expecting value to be function/i))
    it('asserts fn, no name', () => expect(() => assert.fn(false)).toThrowError(/expecting function/i))

    it('asserts arr good', () => expect(() => assert.arr([], 'value')).not.toThrow())
    it('asserts arr bad', () => expect(() => assert.arr({}, 'value')).toThrowError(/expecting value to be array/i))
    it('asserts arr, no name', () => expect(() => assert.arr({})).toThrowError(/expecting array/i))
  })

  describe('report', () => {
    it('generates correct report', () => {
      function fn (a, b) {
        assert('fn')
          .num(a, 'a')
          .optional.num(b, 'b')
          .$eval()
      }
      expect(() => fn('')).toThrowError(/in call to "fn"/)
      expect(() => fn('')).toThrowError(/\n\s{2}- expecting a to be number/)
      expect(() => fn('')).not.toThrowError(/\n\s{2}- expecting b to be number/)
      expect(() => fn('', '')).toThrowError(/\n\s{2}- expecting b to be number/)
    })
  })
})
