import querystring from 'node:querystring'

const TNM_ACCESS_API_URL = `https://tnmaccess.nationalmap.gov/api/v1/products`

export default function(boundingBox) {
  return TNM_ACCESS_API_URL + '?' + querystring.stringify({
    'bbox': encodeURI(boundingBox),
    'datasets': "Digital Elevation Model (DEM) 1 meter",
    'prodFormats': 'GeoTIFF',
    'outputFormat': 'JSON'
  })
}
