import { isInteger, isString, isObject, isArray } from './utils'

const _get = (path = [], inputJson, returnOnFailureValue = undefined) =>
    path.reduce(
      (result, currPathItem) =>
        result && result[currPathItem]
          ? result[currPathItem]
          : returnOnFailureValue,
      inputJson
    ),
  get = (...args) =>
    args.length < 2 ? get.bind(this, ...args) : _get.apply(this, [...args]),
  _set = (path = [], value, inputJson) =>
    [...path]
      .reverse()
      .reduce((result, currPathItem, currPathIndex, givenPathReversed) => {
        const headList = givenPathReversed.slice(currPathIndex + 1).reverse(),
          dataHere = get(headList, inputJson)

        if (isObject(dataHere)) {
          return {
            ...dataHere,
            [currPathItem]: result
          }
        }

        if (isArray(dataHere) && isInteger(+currPathItem)) {
          const keyAsNum = +currPathItem

          return Object.assign([...dataHere], {
            [keyAsNum]: result
          })
        }

        if (dataHere === undefined) {
          if (isString(currPathItem))
            return {
              [currPathItem]: result
            }

          if (isInteger(currPathItem))
            return Object.assign([], {
              [currPathItem]: result
            })
        }

        return result
      }, value),
  set = (...args) =>
    args.length < 3 ? set.bind(this, ...args) : _set.apply(this, [...args])

export { get, set }
