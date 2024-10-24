import buildEndpoint from './elevation-model/build-endpoint.js'
import fetchTiffUrls from './elevation-model/fetch-tiff-urls.js'
import filterTiffs from './elevation-model/filter-tiffs.js'
import downloadTiffs from './elevation-model/download-tiffs.js'
import merge from './elevation-model/merge.js'
import crop from './elevation-model/crop.js'
import * as childProcess from 'child_process'

export default {

  async elevationModel(boundingBox, sseSession) {

    /*
    // get the tiff file URLs
    sseSession.push('build endpoint URL')
    let endpoint = buildEndpoint(boundingBox)

    sseSession.push('fetch Tiff URLs')
    let tiffs = await fetchTiffUrls(endpoint)

    // filter out the files that have already been downloaded
    sseSession.push('check file cache')
    let filteredTiffUrls = await filterTiffs(tiffs)

    // Download what tiffs we don't already have!
    sseSession.push('downloading Tiffs')
    await downloadTiffs(filteredTiffUrls)

    // merge them all!
    // note that we don't want to use the filtered tiff collection for this
    sseSession.push('merge Tiffs')
    let filePath = await merge(tiffs)

    // crop
    sseSession.push('crop Tiffs')
    await crop(boundingBox, filePath)

    return filePath
    */
    return null
  },

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
  }
}
