export default function(result) {
  if(result.length==0) return ({ error: "Empty query" })
  else if(result.length>1) throw new Error('Query for one row returned more than one row')
  else return result[0]
}
