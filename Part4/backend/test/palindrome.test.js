const { palidrome } = require('../utils/for_testing')

test('palindome of nacho', () => {
  const result = palidrome('nacho')
  expect(result).toBe('ohcan')
})

test('palindrome of empty string', () => {
  const resutls = palidrome()

  expect(resutls).toBe('')
})
