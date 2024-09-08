export default function (database, overrides={}) {
  let defaults = {
  }

  return { ...defaults, ...overrides }
}
