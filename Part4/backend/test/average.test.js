const { average } = require('../utils/for_testing')

describe('average', () => {
  test('Cuando le mandamos un valor, deberia ser ese valor', () => {
    expect(average([1])).toBe(1)
  })

  test('Calculo de media', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('Un array vacio debe tener media 0', () => {
    expect(average([])).toBe(0)
  })
})
