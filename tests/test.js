import { get, set } from '../src/index'
import { data_1, data_2 } from './data'
import { vo } from '../src/utils'

describe('Get - the main getter function', () => {
  test('should get the value at the specified path for a given object', () => {
    expect(get(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
  })

  test('should return the specified default value if get operation fails', () => {
    expect(get(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'], 'N/A')).toBe('N/A')
  })

  test('should return null on failure when the default value is not specified', () => {
    expect(get(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'])).toBeNull()
  })

  test('should work well with arrays on the way', () => {
    expect(get(data_2, ['a', 'b', 'c', 1])).toBe('a string')
    expect(get(data_2, ['a', 'b', 'c', 3, 1, 'name'])).toBe('JavaScript')
  })
})

describe('Set - the main setter function', () => {
  test('should set value at the specified path immutably', () => {
    const setObj = set(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!'),
      setObj2 = set(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!')

    expect(get(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
    expect(get(setObj, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Greetings!!!')
    expect(setObj).toEqual(setObj2)
    expect(setObj).not.toBe(setObj2)
  })

  test('should work with arrays on the way', () => {
    const setObj = set(data_2, ['a', 'b', 'c', 2, 'd'], 'Greetings'),
      setObj2 = set(data_2, ['a', 'b', 'c', 3, 1, 'name'], 'React')

    expect(get(setObj, ['a', 'b', 'c', 2, 'd'])).toBe('Greetings')
    expect(get(setObj, ['a', 'b', 'c'])).toBeInstanceOf(Array)
    expect(get(setObj2, ['a', 'b', 'c', 3, 1, 'name'])).toBe('React')
  })
})
