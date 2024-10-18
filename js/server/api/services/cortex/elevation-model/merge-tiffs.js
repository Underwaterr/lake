import crypto from 'node:crypto'
import childProcess from 'node:child_process'
import { promisify } from 'node:util'
let exec = promisify(childProcess)

export default function() {
  let spaceSeparatedFileNames = tiffs.reduce(
    (accumulation, tiff)=> accumulation + " " + tiff.fileName,
    "")
  let tiffId = crypto.randomUUID()
  let fileName = tiffId + '.tif'
  let mergeCommand = `gdal_merge -o ${fileName} ${spaceSeparatedFileNames}`
  return exec(mergeCommand)
}
