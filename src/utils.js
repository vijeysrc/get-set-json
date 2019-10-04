const vo = inputObject => console.log(JSON.stringify(inputObject, null, 2)), // view object
  isString = input => typeof input === 'string',
  isInteger = input =>
    typeof input === 'number' && isFinite(input) && Math.floor(input) === input,
  isArray = input => Array.isArray(input),
  isObject = input =>
    !isArray(input) && input !== null && typeof input === 'object'

export { vo, isString, isInteger, isArray, isObject }
