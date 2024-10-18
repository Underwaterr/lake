import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { rename } from 'node:fs/promises'

let download = (readStream, writeStream)=>
  Readable
    .fromWeb(readStream)
    .pipe(writeStream)

const DOWNLOAD_DIRECTORY = process.env['DOWNLOAD_DIRECTORY']

export default async function (url, filename) {
  console.log('downloading', filename)
  let response = await fetch(url)
  let path = DOWNLOAD_DIRECTORY + filename
  let destination = createWriteStream(path + '.part')
  await finished(download(response.body, destination))
  await rename(path + '.part', path)
  return path
}
