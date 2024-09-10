import childProcess from 'node:child_process'

export default {

  centroidSplitter(input) {
    return new Promise((resolve, reject)=> {
      let bin = childProcess.spawn('./bin/centroid-splitter', [input])

      let output = ""
      bin.stdout.on('data', data=> output += data.toString())

      bin.on('error', error=> {
        reject(error)
      })

      bin.on('close', code=> {
        if (code==0) resolve(JSON.parse(output))
        else if (code==1) reject(new Error('Centroid Splitter exited with error code 1'))
      })
    })
  }
}
