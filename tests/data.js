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

export { data_1, data_2, data_3, persons }
