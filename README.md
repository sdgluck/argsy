<p align="center">
  <img src="https://github.com/sdgluck/argsy/blob/master/assets/maple.png" />
</p>

<p><h1 align="center">argsy</h1></p>

<p align="center">Awesome argument assertion</p>

<p align="center">Made with ❤ at <a href="http://www.twitter.com/outlandish">@outlandish</a></p>
  
<p align="center">
    <a href="http://badge.fury.io/js/argsy"><img alt="npm version" src="https://badge.fury.io/js/argsy.svg" /></a>
</p>

<hr/>

Argument-oriented assertions...

- assertions that name offending arguments
- collects assertion failures and groups them in a single error
- reports function name, location, and [clean stack trace](https://github.com/sdgluck/error-clean-stack)
- support for optional arguments

<img src="https://github.com/sdgluck/argsy/blob/master/example.gif" />
 
## Example

#### Before

```js
function hello (name, message) {
  if (typeof name !== 'string' || !name.length) {
    throw new Error('expecting name to be non-empty string')
  } else if (message && typeof message !== 'string') {
    throw new Error('expecting message to be string')
  }
  console.log('hello', name, message)
}
hello() //=> Error: expecting name to be non-empty string
```

#### After

```js
function hello (name, message) {
  assert('hello')
    .nonEmptyStr(name)
    .optional.str(message).$()
  console.log('hello', name, message)
}
hello()
//=>  Error: Failed argument assertions in call to "hello" at C:/hello.js:1:
//      - expecting name to be non-empty string
```
 
## Install

```sh
npm install --save argsy
```

```sh
yarn add argsy
```

## Import

```js
// ES2015
import assert from 'argsy'
```

```js
// CommonJS
var assert = require('argsy')
```

## API

### `assert.{method}(val[, subject][, name[, name2]])`

Assert `val` is of type indicated by `method` (see below).

- __val__ {*} value to assert
- __subject__ {*} _(optional)_ subject of assert
- __name__ {String} name to report in error message
- __nam2__ {String} _(optional)_ name of subject

No return value.

## `AssertionInstance`

### `assert([name]) : AssertionInstance`

Create a new assertion instance.

- __name__ {String} _(optional)_ name of the assertion instance 

Returns an `AssertionInstance`.

### `AssertionInstance.{method}(val[, subject][, name[, name2]])`

Assert `val` is of type indicated by `method` (see below).

- __val__ {*} value to assert
- __subject__ {*} _(optional)_ subject of assert
- __name__ {String} name to report in error message
- __nam2__ {String} _(optional)_ name of subject

Returns the `AssertionInstance`.

#### Methods

```
ok
notOk
str
obj
nonEmptyStr
num
sym
int
bool
undef
null
nan
elem (use subject arg)
key (use subject arg)
```

### `AssertionInstance.optional.{method}()`

Assert an optional value. 

Shares the same API as `AssertionInstance.method` (see above).

Returns the `AssertionInstance`.

### `AssertionInstance.$eval()`

Assert the arguments.

This should be called last in the chain of assertion declarations.

## More Examples

### `examples/report.js`

Evaluates all assertions, groups them, and reports all failures.

Note call to `$eval` at the end.

```js
function add (a, b) {
  assert('add')
    .num(a, 'a')
    .num(b, 'b')
    .$eval() // or just .$()
    
  return a + b
}

const a = Number(process.argv[1])
const b = Number(process.argv[2])
const result = add(a, b)

console.log(a, '+', b, '=', result)
```

#### Good

```sh
$ node examples/add.js 1 2
1+2=3
```

#### Bad

```sh
$ node add.js
Error: Failed argument assertions in call to "add" at C:/argsy/examples/report.js:10:
  - expecting a to be number
  - expecting b to be number
    at Function.evaluate (C:/argsy/src/index.js:63:13)
    at add (C:/argsy/examples/report.js:10:6)
    at Object.<anonymous> (C:/argsy/examples/report.js:18:16)
```

### `examples/spongebob.js`

Stops and throws at first failed assertion.

```js
import assert from 'argsy'

function person (name, occupation) {
  assert
    .nonEmptyStr(name, 'name')
    .optional.nonEmptyStr(occupation, 'occupation')

  console.log(name + ' is a ' + (occupation || 'sponge'))
}

person('Spongebob')
//=> Spongebob is a sponge

person(['Spongebob'], 'crabby patty flipper')
//=> Error: Expecting name to be a non-empty string

person('Spongebob', 'crabby patty flipper')
//=> Spongebob is a crabby patty flipper
```

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out the [great video tutorials on egghead.io](http://bit.ly/2aVzthz)!

## License

MIT © [Sam Gluck](https://github.com/sdgluck)
