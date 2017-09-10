const assert = require('../')

function catchAndLog (fn) {
  try {
    fn()
  } catch (err) {
    console.log(err)
  }
}

function person (name, occupation) {
  assert('util.person')
    .nonEmptyStr(name, 'name')
    .optional.nonEmptyStr(occupation, 'occupation')
    .$eval()

  console.log(name + ' is a ' + (occupation || 'sponge'))
}

catchAndLog(() => {
  person('Spongebob')
})

catchAndLog(() => {
  person(['Spongebob'], 'crabby patty flipper')
})

catchAndLog(() => {
  person('Spongebob', 'crabby patty flipper')
})
