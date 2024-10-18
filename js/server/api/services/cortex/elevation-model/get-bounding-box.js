export default function(polygon) {
  console.log(polygon)
  polygon = [ polygon ]
  let boundingBox = [ Infinity, Infinity, -Infinity, -Infinity ]
  let x = polygon.reduce((dump, part)=> dump.concat(part), [])
  let y = x.reduce((prev, coord)=> [
      Math.min(coord[0], prev[0]),
      Math.min(coord[1], prev[1]),
      Math.max(coord[0], prev[2]),
      Math.max(coord[1], prev[3])
    ], boundingBox)
  console.log(y)
  return y
}
