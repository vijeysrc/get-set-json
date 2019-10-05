# get-set-json

> Immutable setter and getter library that works on JSON data

## Install

```
$ npm install --save get-set-json
```

## Features

1. This library exposes 4 functions.

   - get
   - set
   - getd
   - setd

1. The functions work immutably. This means the source data remains unaffected.

1. The functions are curried up to the mandatory arguments.

1. To help in functional compositions, the functions come in two flavors.

   - Data last
     - get
     - set
   - Data first
     - getd
     - setd

1. This is a zero-dependency library.

## get API

### get(path, sourceJson, defaultValue) / getd(sourceJson, path, defaultValue)

Returns: the value at the given path

#### path

Type: `Array`

The sequence of keys (of intermediate objects) / indexes (of intermediate arrays) in array format.

#### sourceJson

Type: `Object` or `Array`

The source JSON data.

#### defaultValue

Type: `Any`

The optional default value if the path does not exist. If not given, `undefined` is returned.

## set API

### set(path, value, sourceJson) / setd(sourceJson, path, value)

Returns: a new json after setting value at the given path

#### path

Type: `Array`

The sequence of keys (of intermediate objects) / indexes (of intermediate arrays) in array format.

#### value

Type: `Any`

The value to be set at a given path location.

#### sourceJson

Type: `Object` or `Array`

The source JSON data.

## Usage

Sample data for usage notes is given below

### Usage - the get method

```js
import { get } from 'get-set-json'

const valueF1 = get(['a', 'b', 'c', 'd', 'e', 'f1'], data_1) // Hello

// The get method takes a default value in case of an incorrect / missing path
// In this case, it is missingData
// If the default value is not provided, the get method returns undefined
const valueF1BadPath = get(
  ['a', 'b', 'c', 'dx', 'e', 'f1'],
  data_1,
  'missingData' // The third optional argument for default value
) // missingData

// Works with array on the way
// Use integers for array indexes
get(['a', 'b', 'c', 3, 1, 'name'], data_2) // JavaScript

// Works with array
get([2], data_3) // two
get([5], data_3) // five
get([7], data_3) // seven

// Curriable up to 2 arguments as the get method needs 2 mandatory arguments.
// The third argument (default value) is optional. Therefore, the currying does not wait for the third argument.
const personFirstName = get(['name', 'first']),
  personLastName = get(['name', 'last']),
  personBadPath = get(['name1', 'first'])

personFirstName(persons[0]) // John
personLastName(persons[0]) // Smith
personBadPath(persons[0], 'missingData') // missingData

personFirstName(persons[1]) // Joanne
personLastName(persons[1]) // Taylor
personBadPath(persons[1], 'missingData') // missingData

personFirstName(persons[2]) // James
personLastName(persons[2]) // Bond
personBadPath(persons[2], 'missingData') // missingData
```

### Usage - the set method

```js
// A simple usage to set a value at a particular key
// The set happens immutably, this means, the source json data_1 remains unaffected
// The destination json dest_data_1 has the new values
const dest_data_1 = set(['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!', data_1)

// It returns new data on every call
const dest_data_2 = set(['a', 'b', 'c', 'd', 'e', 'f1'], 'Greetings!!!', data_1)
dest_data_1 === dest_data_2 // false
dest_data_1 === data_1 // false
dest_data_2 === data_1 // false

// New levels are created on missing keys/path
set(['a', 'b', 'c'], 'Greetings', {}) // {a: { b: { c: 'Greetings' }}}

// New levels are created on missing keys/path - arrays created when key is an integer
set(['a', 'b', 2], 'Greetings', {}) // { a: { b: [undefined, undefined, 'Greetings'] }}

// New levels are created on missing keys/path - objects created when key is a string
set(['a', 'b', '221'], 'Greetings', {}) // { a: { b: { 221: 'Greetings' }}}
```

## Sample data for the Usage notes

```js
const data_1 = Object.freeze({
    a: {
      b: {
        c: {
          d: {
            e: {
              f1: 'Hello',
              f2: 'World!!!'
            }
          }
        }
      },
      b1: 'bOne Item'
    }
  }),
  data_2 = Object.freeze({
    a: {
      b: {
        c: [
          false,
          'a string',
          {
            d: 'Hello'
          },
          [
            'a string',
            {
              name: 'JavaScript'
            }
          ]
        ]
      }
    }
  }),
  data_3 = Object.freeze([
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten'
  ]),
  persons = Object.freeze([
    {
      name: {
        first: 'John',
        last: 'Smith'
      }
    },
    {
      name: {
        first: 'Joanne',
        last: 'Taylor'
      }
    },
    {
      name: {
        first: 'James',
        last: 'Bond'
      }
    }
  ])
```
