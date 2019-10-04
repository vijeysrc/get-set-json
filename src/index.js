import { isInteger, isString, isObject, isArray, currify } from './utils'

const _get = (path = [], inputJson, returnOnFailureValue = undefined) =>
    path.reduce(
      (result, currPathItem) =>
        result && result[currPathItem]
          ? result[currPathItem]
          : returnOnFailureValue,
      inputJson
    ),
  _getd = (inputJson, path = [], returnOnFailureValue = undefined) =>
    _get(path, inputJson, returnOnFailureValue),
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
  _setd = (inputJson, path = [], value) => _set(path, value, inputJson),
  get = currify(_get, 2),
  getd = currify(_getd, 2),
  set = currify(_set, 3),
  setd = currify(_setd, 3)

export { get, getd, set, setd }
