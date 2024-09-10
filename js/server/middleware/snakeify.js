import transform from 'lodash.transform'
import snakeCase from 'lodash.snakecase'

// convert object keys from camelCase to snake_case
let snakify = object=> {
  return transform(object, (result, value, key)=> {
    return result[snakeCase(key)] = value
  })
}

export default function(request, response, next) {
  request.body = snakify(request.body)
  next()
}
