import { get } from '../src/index'
import { data_1 } from './data'

describe('Get - the main getter function', () => {
  test('should get the value at the specified path for a given object', () => {
    expect(get(data_1, ['a', 'b', 'c', 'd', 'e', 'f1'])).toEqual('hi')
  })
})
