import downloadTiff from './download-tiff.js'

export default async function(tiffs) {
  return Promise.allSettled(tiffs.map(t=> downloadTiff(t.url, t.fileName)))
}
