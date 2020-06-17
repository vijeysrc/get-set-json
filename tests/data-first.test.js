import { getd, setd } from '../src/index'
import { data_1, data_2, data_3, persons } from './data'

const missingData = '**Missing Data**'

describe('Data first approach - getter / setter', () => {
  describe('Get - the main getter function', () => {
    test('should get the value at the specified path for a given object', () => {
      expect(getd(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
    })

    test('should return the specified default value if get operation fails', () => {
      expect(getd(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'], 'N/A')).toBe('N/A')
    })

    test('should return undefined on failure when the default value is not specified', () => {
      expect(getd(data_1, ['a', 'b', 'c', 'dx', 'e', 'f1'])).toBeUndefined()
    })

    test('should work well with arrays on the way', () => {
      expect(getd(data_2, ['a', 'b', 'c', 1])).toBe('a string')
      expect(getd(data_2, ['a', 'b', 'c', 3, 1, 'name'])).toBe('JavaScript')
    })

    test('should work with arrays', () => {
      expect(getd(data_3, [2])).toBe('two')
      expect(getd(data_3, [5])).toBe('five')
      expect(getd(data_3, [7])).toBe('seven')
    })
  })

  describe('Set - the main setter function', () => {
    test('should set value at the specified path immutably', () => {
      const setObj = setd(
          data_1,
          ['a', 'b', 'c', 'd', 'e', 'f1'],
          'Greetings!!!'
        ),
        setObj2 = setd(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!')

      expect(getd(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Hello')
      expect(getd(setObj, ['a', 'b', 'c', 'd', 'e', 'f1'])).toBe('Greetings!!!')
      expect(setObj).toEqual(setObj2)
      expect(setObj).not.toBe(setObj2)
    })

    test('should work with arrays on the way', () => {
      const setObj = setd(data_2, ['a', 'b', 'c', 2, 'd'], 'Greetings'),
        setObj2 = setd(data_2, ['a', 'b', 'c', 3, 1, 'name'], 'React')

      expect(getd(setObj, ['a', 'b', 'c', 2, 'd'])).toBe('Greetings')
      expect(getd(setObj, ['a', 'b', 'c'])).toBeInstanceOf(Array)
      expect(getd(setObj2, ['a', 'b', 'c', 3, 1, 'name'])).toBe('React')
    })

    test('should set not just primitive values but also objects / arrays', () => {
      expect(
        setd({ a: { b: { c: {} } } }, ['a', 'b', 'c'], {
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

      expect(setd({}, ['a'], [1, 2, 3])).toEqual({
        a: [1, 2, 3]
      })
    })

    test('should be able to update values at the start or end of an array', () => {
      expect(
        setd(
          {
            a: {
              b: ['item 1', 'item 2', 'item 3']
            }
          },
          ['a', 'b', 0],
          'New item 1'
        )
      ).toEqual({
        a: {
          b: ['New item 1', 'item 2', 'item 3']
        }
      })

      expect(
        setd(
          {
            a: {
              b: ['item 1', 'item 2', 'item 3']
            }
          },
          ['a', 'b', 2],
          'New item 3'
        )
      ).toEqual({
        a: {
          b: ['item 1', 'item 2', 'New item 3']
        }
      })
    })
  })

  describe('Set - when keys are missing', () => {
    test('should create new levels - when path name is a string', () => {
      expect(setd({}, ['a', 'b', 'c'], 'Greetings')).toEqual({
        a: {
          b: {
            c: 'Greetings'
          }
        }
      })
    })

    test('should create new levels - when path name is an integer', () => {
      expect(setd({}, ['a', 'b', 2], 'Greetings')).toEqual({
        a: {
          b: [undefined, undefined, 'Greetings']
        }
      })
    })

    test('should create new levels - when path name is an integer in string format', () => {
      expect(setd({}, ['a', 'b', '2'], 'Greetings')).toEqual({
        // compare with the above
        a: {
          b: {
            '2': 'Greetings'
          }
        }
      })

      expect(setd({}, ['a', 'b', '221'], 'Greetings')).toEqual({
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
      const person_0 = getd(persons[0]),
        person_1 = getd(persons[1]),
        person_2 = getd(persons[2]),
        firstPath = ['name', 'first'],
        lastPath = ['name', 'last'],
        badPath = ['name2', 'first']

      expect(person_0(firstPath)).toBe('John')
      expect(person_0(lastPath)).toBe('Smith')
      expect(person_0(badPath, missingData)).toBe(missingData)

      expect(person_1(firstPath)).toBe('Joanne')
      expect(person_1(lastPath)).toBe('Taylor')
      expect(person_1(badPath, missingData)).toBe(missingData)

      expect(person_2(firstPath)).toBe('James')
      expect(person_2(lastPath)).toBe('Bond')
      expect(person_2(badPath, missingData)).toBe(missingData)
    })

    test('should be curriable for set up to 3 params', () => {
      const path = ['a', 'b', 'c', 'd', 'e', 'f1'],
        dataOneSetter = setd(data_1),
        dataOneSetterWithPath = dataOneSetter(path),
        resultObject = dataOneSetterWithPath('Curried here!!!'),
        getter = getd(resultObject)

      expect(getter(path)).toBe('Curried here!!!')
    })
  })
})
