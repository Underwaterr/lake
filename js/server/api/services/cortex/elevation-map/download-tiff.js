import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'


export default async function({ url, filename }) {
  let response = await fetch(url)

  // TODO
  // monitor file download progress?
  let destination = createWriteStream(filename)

  Readable
    .fromWeb(response.body)
    .pipe(destination)
}
