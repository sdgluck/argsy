# arse

> assert stuff

## Install

```sh
npm install --save arse
```

```sh
yarn add arse
```

## Import

```js
// ES2015
import arsgy from 'arse'
```

```js
// CommonJS
var arse = require('arse')
```

## API

### `arse.{method}(val[, subject][, name[, name2]])`

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

