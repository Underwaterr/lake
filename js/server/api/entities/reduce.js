export default function(result) {
  if(result.length==0) return ({ error: "Empty query" })
  else return result[0]
}
