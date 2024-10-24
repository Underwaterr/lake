import buildEndpoint from './elevation-model/build-endpoint.js'
import getTiffUrls from './elevation-model/get-tiff-urls.js'
import filterTiffUrls from './elevation-model/filter-tiff-urls.js'
import downloadTiffs from './elevation-model/download-tiffs.js'
import merge from './elevation-model/merge.js'
import crop from './elevation-model/crop.js'
import * as childProcess from 'child_process'

export default {

  async elevationModel(boundingBox, sseSession) {
    // first, given the bounding box, generate the URL we'll use to download the GeoTIFF URLs
    let endpoint = buildEndpoint(boundingBox)

    sseSession.push('Searching for GeoTIFFs from The National Map API')
    let tiffUrls = await getTiffUrls(endpoint)

    // don't download tiffs we already have!
    let filteredTiffUrls = await filterTiffUrls(tiffUrls)

    // download the rest
    sseSession.push('Downloading GeoTIFFs...')
    await downloadTiffs(filteredTiffUrls)

    // merge all the tiffs together
    // note that we want all the tiff urls, not just ones we download
    sseSession.push('Merging GeoTIFFs...')
    let filePath = await merge(tiffUrls)

    // crop
    sseSession.push('Cropping GeoTIFF')
    let croppedFilePath = await crop(boundingBox, filePath)

    // return file path via special "complete" event
    sseSession.push(croppedFilePath, "complete")
    return;
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
