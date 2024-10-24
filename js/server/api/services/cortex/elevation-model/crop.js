import utmObj from 'utm-latlng'

export default function(boundingBox, filePath) {
  let { minX, minY, maxX, maxY } = boundingBox.split(',')
  let utm = new utmObj()
  let minUtm = utm.convertLatLngToUtm(minY, minX, 6)
  let maxUtm = utm.convertLatLngToUtm(maxY, maxX, 6)
  let cropCommand = `gdalwarp -te ${minUtm.Easting} ${minUtm.Northing} ${maxUtm.Easting} ${maxUtm.Northing} ${filePath} ${'cropped-' + filePath}`
  console.log('this right??', cropCommand)
  //return exec(cropCommand)
}

