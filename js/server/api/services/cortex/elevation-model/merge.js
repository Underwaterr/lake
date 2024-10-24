import crypto from 'node:crypto'
import childProcess from 'node:child_process'
import { promisify } from 'node:util'
let exec = promisify(childProcess.exec)

const DOWNLOAD_DIRECTORY = process.env['DOWNLOAD_DIRECTORY']

export default async function(tiffs) {
  // format the file path names for the `gdal_merge.py` command
  let spaceSeparatedFilePaths = tiffs.reduce(
    (accumulation, tiff)=> accumulation + " " + DOWNLOAD_DIRECTORY + tiff.fileName,
    "")

  // come up with a random UUID for the file name
  let tiffId = crypto.randomUUID()
  let filePath = DOWNLOAD_DIRECTORY + tiffId + '.tif'

  // merge
  let mergeCommand = `gdal_merge.py -o ${filePath} ${spaceSeparatedFilePaths}`
  await exec(mergeCommand)

  // once done, return the file name
  return filePath
}
