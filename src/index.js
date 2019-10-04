import { isObject, isArray } from './utils'

const get = (obj, keys = [], returnOnFailureValue = null) =>
    keys.reduce(
      (acc, key) => (acc && acc[key] ? acc[key] : returnOnFailureValue),
      obj
    ),
  set = (obj, path = [], value) => {
    return path.reverse().reduce((acc, curr, index, data) => {
      const headList = data.slice(index + 1).reverse(),
        setLevel = get(obj, headList)

      if (isObject(setLevel)) {
        return {
          ...setLevel,
          [curr]: acc
        }
      }
      if (isArray(setLevel)) {
        const keyAsNum = +curr

        return Object.assign([...setLevel], {
          [keyAsNum]: acc
        })
      }
    }, value)
  }

export { get, set }
