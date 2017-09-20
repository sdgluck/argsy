const assert = require('../')

function catchAndLog (fn) {
  try {
    fn()
  } catch (err) {
    console.log(err)
  }
}

function person (name, occupation) {
  assert('spongebob')
    .nonEmptyStr(name, 'name')
    .optional.nonEmptyStr(occupation, 'occupation')
    .$eval()

  console.log(name + ' is a ' + (occupation || 'sponge'))
}

catchAndLog(() => {
  console.log('1:')
  person('Spongebob')
})

console.log()

catchAndLog(() => {
  console.log('2:')
  person(['Spongebob'], 'crabby patty flipper')
})

console.log()

catchAndLog(() => {
  console.log('3:')
  person('Spongebob', 'crabby patty flipper')
})
