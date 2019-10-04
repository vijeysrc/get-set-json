import { isInteger, isString, isObject, isArray } from './utils'

const _get = (obj, keys = [], returnOnFailureValue = undefined) =>
    keys.reduce(
      (acc, key) => (acc && acc[key] ? acc[key] : returnOnFailureValue),
      obj
    ),
  get = (...args) =>
    args.length < 2 ? get.bind(this, ...args) : _get.apply(this, [...args]),
  _set = (inputObject, path = [], value) =>
    [...path]
      .reverse()
      .reduce((result, currPathItem, currPathIndex, givenPathReversed) => {
        const headList = givenPathReversed.slice(currPathIndex + 1).reverse(),
          setLevel = get(inputObject, headList)

        if (isObject(setLevel)) {
          return {
            ...setLevel,
            [currPathItem]: result
          }
        }

        if (isArray(setLevel) && isInteger(+currPathItem)) {
          const keyAsNum = +currPathItem

          return Object.assign([...setLevel], {
            [keyAsNum]: result
          })
        }

        if (setLevel === undefined) {
          return isString(currPathItem)
            ? {
                [currPathItem]: result
              }
            : Object.assign([], {
                [currPathItem]: result
              })
        }

        return result
      }, value),
  set = (...args) =>
    args.length < 3 ? set.bind(this, ...args) : _set.apply(this, [...args])

export { get, set }
