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
      b1: 'b1'
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
  })

export { data_1, data_2 }
