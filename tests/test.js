import { get, set } from '../src/index'
import { data_1 } from './data'

describe('Get - the main getter function', () => {
  test('should get the value at the specified path for a given object', () => {
    expect(get(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
  })

  test('should return the specified default value if get operation fails', () => {
    expect(get(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'], 'N/A')).toBe('N/A')
  })

  test('should return null on failure when the default value is not specified', () => {
    expect(get(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'])).toBe(null)
  })
})

describe('Set - the main setter function', () => {
  test('should set value at the specified path immutably', () => {
    const setObj = set(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!')
    expect(get(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
    expect(get(setObj, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Greetings!!!')
  })
})
