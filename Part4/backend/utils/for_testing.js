const palidrome = (string = '') => {
  return string.split('').reverse().join('')
}

const average = array => {
  if (array.length < 1) {
    return 0
  }
  let suma = 0
  array.forEach((num) => {
    suma = suma + num
  })
  return suma / array.length
}

module.exports = {
  palidrome,
  average
}
