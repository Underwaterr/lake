import { readdir } from "node:fs/promises"
const DOWNLOAD_DIRECTORY = process.env['DOWNLOAD_DIRECTORY']

export default async function(tiffs) {
  let downloadedFiles = await readdir(DOWNLOAD_DIRECTORY)
  return tiffs.filter(t=> !downloadedFiles.some(f=> f==t.fileName))
}
