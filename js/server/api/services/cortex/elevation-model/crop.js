import utmObj from 'utm-latlng'
import childProcess from 'node:child_process'
import { promisify } from 'node:util'
let exec = promisify(childProcess.exec)

const DOWNLOAD_DIRECTORY = process.env['DOWNLOAD_DIRECTORY']

export default async function(boundingBox, filePath) {
  // GDAL requires UTM, so we convert the bounding box from Latitude/Longitude
  // TODO: handle when our elevation model spans two UTM zones
  let [ minX, minY, maxX, maxY ] = boundingBox.split(',')
  let utm = new utmObj()
  let minUtm = utm.convertLatLngToUtm(minY, minX, 6)
  let maxUtm = utm.convertLatLngToUtm(maxY, maxX, 6)


  // come up with a random UUID for the file name
  // cuz `gdalwarp` can't edit-in-place
  let tiffId = crypto.randomUUID()
  let croppedFilePath = DOWNLOAD_DIRECTORY + 'cropped-' + tiffId + '.tif'

  // Crop!
  let cropCommand = `gdalwarp -te ${minUtm.Easting} ${minUtm.Northing} ${maxUtm.Easting} ${maxUtm.Northing} ${filePath} ${croppedFilePath}`
  await exec(cropCommand)
  return croppedFilePath
}
