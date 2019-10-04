import { get, set } from '../src/index'
import { data_1, data_2, data_3 } from './data'
import { vo } from '../src/utils'

describe('Get - the main getter function', () => {
  test('should get the value at the specified path for a given object', () => {
    expect(get(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
  })

  test('should return the specified default value if get operation fails', () => {
    expect(get(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'], 'N/A')).toBe('N/A')
  })

  test('should return undefined on failure when the default value is not specified', () => {
    expect(get(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'])).toBeUndefined()
  })

  test('should work well with arrays on the way', () => {
    expect(get(data_2, ['a', 'b', 'c', 1])).toBe('a string')
    expect(get(data_2, ['a', 'b', 'c', 3, 1, 'name'])).toBe('JavaScript')
  })

  test('should work with arrays', () => {
    expect(get(data_3, [2])).toBe('two')
    expect(get(data_3, [5])).toBe('five')
    expect(get(data_3, [7])).toBe('seven')
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

  test('should set not just primitive values but also objects / arrays', () => {
    expect(
      set({ a: { b: { c: {} } } }, ['a', 'b', 'c'], {
        name: 'JavaScript',
        age: '25'
      })
    ).toEqual({
      a: {
        b: {
          c: {
            name: 'JavaScript',
            age: '25'
          }
        }
      }
    })

    expect(set({}, ['a'], [1, 2, 3])).toEqual({
      a: [1, 2, 3]
    })
  })
})

describe('Set - when keys are missing', () => {
  test('should create new levels - when path name is a string', () => {
    expect(set({}, ['a', 'b', 'c'], 'Greetings')).toEqual({
      a: {
        b: {
          c: 'Greetings'
        }
      }
    })
  })

  test('should create new levels - when path name is an integer', () => {
    expect(set({}, ['a', 'b', 2], 'Greetings')).toEqual({
      a: {
        b: [undefined, undefined, 'Greetings']
      }
    })
  })
})
