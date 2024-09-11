export default function(result) {
  if(result.length==0) return { error: "not found" }
  else return result[0]
}
