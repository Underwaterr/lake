// oops I'm not used currently

export default function(polygon) {
  let boundingBox = [ Infinity, Infinity, -Infinity, -Infinity ]
  return polygon
    .reduce((dump, part)=> dump.concat(part), [])
    .reduce((prev, coord)=> [
      Math.min(coord[0], prev[0]),
      Math.min(coord[1], prev[1]),
      Math.max(coord[0], prev[2]),
      Math.max(coord[1], prev[3])
    ], boundingBox)
}
