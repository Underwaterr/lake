// our NodeJS Postgres library will always return an array,
// even in cases like "get by id" where we should get exactly one result
// so `reduce` will confirm there is only one item as expected
// and removes the superfluous array
export default function(result) {
  if(result instanceof Promise) return ({ error: "Promise not handled correctly" })
  else if(result.length==0) return ({ error: "No results" })
  else if(result.length>1) throw new Error('Query for one row returned more than one row')
  else return result[0]
}
