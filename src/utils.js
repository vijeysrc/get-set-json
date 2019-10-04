const vo = inputObject => console.log(JSON.stringify(inputObject, null, 2)), // view object
  isString = input => typeof input === 'string',
  isInteger = input =>
    typeof input === 'number' && isFinite(input) && Math.floor(input) === input,
  isArray = input => Array.isArray(input),
  isObject = input =>
    !isArray(input) && input !== null && typeof input === 'object',
  currify = function(fn, mandatoryArgumentCount = fn.length) {
    return function curryInner() {
      const args = Array.prototype.slice.call(arguments)

      return args.length < mandatoryArgumentCount
        ? curryInner.bind(null, ...args)
        : fn.apply(null, args)
    }
  }

export { vo, isString, isInteger, isArray, isObject, currify }
