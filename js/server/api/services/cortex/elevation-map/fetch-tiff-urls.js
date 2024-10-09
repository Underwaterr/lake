export default async function(requestUrl) {
  let response = await fetch(requestUrl)
  let data = await response.json()
  let downloadUrls = data.items.map(i=> ({
    url: i.downloadURL,
    fileName: i.title
      .replace(/ /g, '-') // replace spaces with dashes
      .toLowerCase()
      + '.tif'
  }))
  return downloadUrls
}
