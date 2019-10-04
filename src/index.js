import { isObject, isArray } from './utils'

const get = (obj, keys = [], returnOnFailureValue = undefined) =>
    keys.reduce(
      (acc, key) => (acc && acc[key] ? acc[key] : returnOnFailureValue),
      obj
    ),
  set = (inputObject, path = [], value) =>
    path
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

        if (isArray(setLevel) && !isNaN(currPathItem)) {
          const keyAsNum = +currPathItem

          return Object.assign([...setLevel], {
            [keyAsNum]: result
          })
        }

        return result
      }, value)

export { get, set }
