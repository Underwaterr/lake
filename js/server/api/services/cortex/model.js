import childProcess from 'node:child_process'
import buildApiUrl from './elevation-model/build-api-url.js'
import fetchTiffUrls from './elevation-model/fetch-tiff-urls.js'
import downloadTiff from './elevation-model/download-tiff.js'

export default {

  centroidSplitter(input) {
    return new Promise((resolve, reject)=> {
      let bin = childProcess.spawn('./bin/centroid-splitter', [input])

      let output = ""
      bin.stdout.on('data', data=> output += data.toString())

      bin.on('error', error=> { reject(error) })

      bin.on('close', code=> {
        if (code==0) resolve(JSON.parse(output))
        else if (code==1) reject(new Error('Centroid Splitter exited with error code 1'))
      })
    })
  },

  async elevationModel(boundingBox) {
    let apiUrl = buildApiUrl(boundingBox)
    let tiffUrls = await fetchTiffUrls(apiUrl)

    // for now...
    return tiffUrls

    //tiffUrls.forEach(downloadTiff)

    // merge
    // crop
    // delete temporary files
  }

}
