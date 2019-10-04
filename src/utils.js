const isArray = input => Array.isArray(input),
  isObject = input =>
    !isArray(input) && input !== null && typeof input === 'object'

export { isArray, isObject }
