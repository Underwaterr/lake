import crypto from 'node:crypto'
import childProcess from 'node:child_process'
import { promisify } from 'node:util'
let exec = promisify(childProcess.exec)

const DOWNLOAD_DIRECTORY = process.env['DOWNLOAD_DIRECTORY']

export default async function(tiffs) {
  let spaceSeparatedFilePaths = tiffs.reduce(
    (accumulation, tiff)=> accumulation + " " + DOWNLOAD_DIRECTORY + tiff.fileName,
    "")
  let tiffId = crypto.randomUUID()
  let filePath = DOWNLOAD_DIRECTORY + tiffId + '.tif'
  let mergeCommand = `gdal_merge.py -o ${filePath} ${spaceSeparatedFilePaths}`
  console.log('COMMAND:', mergeCommand)
  console.log('\n')
  await exec(mergeCommand)
  return filePath
}
