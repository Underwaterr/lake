import buildEndpoint from './elevation-model/build-endpoint.js'
import fetchTiffUrls from './elevation-model/fetch-tiff-urls.js'
import filterTiffs from './elevation-model/filter-tiffs.js'
import getBoundingBox from './elevation-model/get-bounding-box.js'
import downloadTiffs from './elevation-model/download-tiffs.js'

export default {

  async elevationModel(boundingBox, sseSession) {

    // get the tiff file URLs
    sseSession.push('build endpoint URL')
    //let endpoint = buildEndpoint(boundingBox)

    sseSession.push('fetch Tiff URLs')
    //let tiffs = await fetchTiffUrls(endpoint)

    // filter out the files that have already been downloaded
    sseSession.push('check file cache')
    //let filteredTiffUrls = await filterTiffs(tiffs)

    // wait until all the Tiffs have been downloaded
    sseSession.push('download Tiffs')
    // TODO: emit event from `downloadTiffs` on individual file completion?
    sseSession.push('downloaded Tiff 1 of 3')
    sseSession.push('downloaded Tiff 2 of 3')
    sseSession.push('downloaded Tiff 3 of 3')
    // await downloadTiffs()

    // merge them all!
    // note that we don't want to use the filtered tiff collection for this
    sseSession.push('merge Tiffs')
    //await mergeTiffs(tiffs)

    // crop
    sseSession.push('crop Tiffs')
    //await cropTiff()

    return 'https://www.hellodecco.com/path/to/fake.tif'
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
