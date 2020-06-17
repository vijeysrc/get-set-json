import { get, set } from '../src/index'
import { data_1, data_2, data_3, persons } from './data'

const missingData = '**Missing Data**'

describe('Get - the main getter function', () => {
  test('should get the value at the specified path for a given object', () => {
    expect(get(['a', 'b', 'c', 'd', 'e', 'f1'], data_1)).toBe('Hello')
  })

  test('should return the specified default value if get operation fails', () => {
    expect(get(['a', 'b', 'c', 'dx', 'e', 'f1'], data_1, 'N/A')).toBe('N/A')
  })

  test('should return undefined on failure when the default value is not specified', () => {
    expect(get(['a', 'b', 'c', 'dx', 'e', 'f1'], data_1)).toBeUndefined()
  })

  test('should work well with arrays on the way', () => {
    expect(get(['a', 'b', 'c', 1], data_2)).toBe('a string')
    expect(get(['a', 'b', 'c', 3, 1, 'name'], data_2)).toBe('JavaScript')
  })

  test('should work with arrays', () => {
    expect(get([2], data_3)).toBe('two')
    expect(get([5], data_3)).toBe('five')
    expect(get([7], data_3)).toBe('seven')
  })
})

describe('Set - the main setter function', () => {
  test('should set value at the specified path immutably', () => {
    const setObj = set(['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!', data_1),
      setObj2 = set(['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!', data_1)

    expect(get(['a', 'b', 'c', 'd', 'e', 'f1'], data_1)).toBe('Hello')
    expect(get(['a', 'b', 'c', 'd', 'e', 'f1'], setObj)).toBe('Greetings!!!')
    expect(setObj).toEqual(setObj2)
    expect(setObj).not.toBe(setObj2)
  })

  test('should work with arrays on the way', () => {
    const setObj = set(['a', 'b', 'c', 2, 'd'], 'Greetings', data_2),
      setObj2 = set(['a', 'b', 'c', 3, 1, 'name'], 'React', data_2)

    expect(get(['a', 'b', 'c', 2, 'd'], setObj)).toBe('Greetings')
    expect(get(['a', 'b', 'c'], setObj)).toBeInstanceOf(Array)
    expect(get(['a', 'b', 'c', 3, 1, 'name'], setObj2)).toBe('React')
  })

  test('should set not just primitive values but also objects / arrays', () => {
    expect(
      set(
        ['a', 'b', 'c'],
        {
          name: 'JavaScript',
          age: '25'
        },
        { a: { b: { c: {} } } }
      )
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

    expect(set(['a'], [1, 2, 3], {})).toEqual({
      a: [1, 2, 3]
    })
  })

  test('should be able to update values at the start or end of an array', () => {
    expect(
      set(['a', 'b', 0], 'New item 1', {
        a: {
          b: ['item 1', 'item 2', 'item 3']
        }
      })
    ).toEqual({
      a: {
        b: ['New item 1', 'item 2', 'item 3']
      }
    })

    expect(
      set(['a', 'b', 2], 'New item 3', {
        a: {
          b: ['item 1', 'item 2', 'item 3']
        }
      })
    ).toEqual({
      a: {
        b: ['item 1', 'item 2', 'New item 3']
      }
    })
  })
})

describe('Set - when keys are missing', () => {
  test('should create new levels - when path name is a string', () => {
    expect(set(['a', 'b', 'c'], 'Greetings', {})).toEqual({
      a: {
        b: {
          c: 'Greetings'
        }
      }
    })
  })

  test('should create new levels - when path name is an integer', () => {
    expect(set(['a', 'b', 2], 'Greetings', {})).toEqual({
      a: {
        b: [undefined, undefined, 'Greetings']
      }
    })
  })

  test('should create new levels - when path name is an integer in string format', () => {
    expect(set(['a', 'b', '2'], 'Greetings', {})).toEqual({
      // compare with the above
      a: {
        b: {
          '2': 'Greetings'
        }
      }
    })

    expect(set(['a', 'b', '221'], 'Greetings', {})).toEqual({
      a: {
        b: {
          '221': 'Greetings'
        }
      }
    })
  })
})

describe('Currying', () => {
  test('should be curriable for get up to 2 params', () => {
    const personFirstName = get(['name', 'first']),
      personLastName = get(['name', 'last']),
      personBadPath = get(['name1', 'first'])

    expect(personFirstName(persons[0])).toBe('John')
    expect(personLastName(persons[0])).toBe('Smith')
    expect(personBadPath(persons[0], missingData)).toBe(missingData)

    expect(personFirstName(persons[1])).toBe('Joanne')
    expect(personLastName(persons[1])).toBe('Taylor')
    expect(personBadPath(persons[1], missingData)).toBe(missingData)

    expect(personFirstName(persons[2])).toBe('James')
    expect(personLastName(persons[2])).toBe('Bond')
    expect(personBadPath(persons[2], missingData)).toBe(missingData)
  })

  test('should be curriable for set up to 3 params', () => {
    const path = ['a', 'b', 'c', 'd', 'e', 'f1'],
      dataOneSetter = set(path),
      dataOneSetterWithValue = dataOneSetter('Curried here!!!'),
      resultObject = dataOneSetterWithValue(data_1),
      getter = get(path)

    expect(getter(resultObject)).toBe('Curried here!!!')
  })
})
