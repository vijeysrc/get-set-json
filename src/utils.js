const vo = inputObject => console.log(JSON.stringify(inputObject, null, 2)), // view object
  isArray = input => Array.isArray(input),
  isObject = input =>
    !isArray(input) && input !== null && typeof input === 'object'

export { vo, isArray, isObject }
