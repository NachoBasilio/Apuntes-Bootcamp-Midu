const { palidrome } = require('../utils/for_testing')

test.skip('palindome of nacho', () => {
  const result = palidrome('nacho')
  expect(result).toBe('ohcan')
})

test.skip('palindrome of empty string', () => {
  const resutls = palidrome()

  expect(resutls).toBe('')
})
