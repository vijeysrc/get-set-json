const get = (obj, keys = [], returnOnFailureValue = null) =>
  keys.reduce(
    (acc, key) => (acc && acc[key] ? acc[key] : returnOnFailureValue),
    obj
  )

export { get }
