import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { rename } from 'node:fs/promises'

const DOWNLOAD_DIRECTORY = process.env['DOWNLOAD_DIRECTORY']

let writeToDisk = (readStream, writeStream)=>
  Readable
    .fromWeb(readStream)
    .pipe(writeStream)

let download = async function (url, filename, sseSession) {
  console.log('downloading', filename)
  let response = await fetch(url)
  let path = DOWNLOAD_DIRECTORY + filename
  let destination = createWriteStream(path + '.part')
  sseSession.push('Downloading ' + filename)
  await finished(writeToDisk(response.body, destination))
  await rename(path + '.part', path)
  sseSession.push('Downloaded ' + filename)
  return path
}

export default (tiffs, sseSession)=>
  // Resolve Promise when all downloads have completed
  Promise.allSettled(tiffs.map(t=>
    download(t.url, t.fileName, sseSession)))
