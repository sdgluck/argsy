# argsy

> argument-oriented assertion

Extends the built in `assert` Node lib with assertions that 
throw useful argument-oriented messages.

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
import arsgy from 'argsy'
```

```js
// CommonJS
var argsy = require('argsy')
```

## API

### `argsy.{method}(val[, subject][, name[, name2]])`

Assert `val` is of type indicated by `method` (see below).

- __val__ {*} value to assert
- __subject__ {*} _(optional)_ subject of assert
- __name__ {String} name to report in error message
- __nam2__ {String} _(optional)_ name of subject

#### Methods

```
str
obj
nonEmptyStr
num
sym
int
bool
undef
null
elem (use subject arg)
key (use subject arg)
```

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out the [great video tutorials on egghead.io](http://bit.ly/2aVzthz)!

## License

MIT © [Sam Gluck](https://github.com/sdgluck)

