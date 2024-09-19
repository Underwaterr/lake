export default function(result) {
  if(result.length==0) throw new Error("None found")
  else return result[0]
}
