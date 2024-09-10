export default async function handleError(error, request, response, next) {

  // for validation errors
  if(error.code = 'E_VALIDATION_ERROR') {
    response.status(422).json(error.messages)
  }
  // all other errors
  else {
    console.error(error)
    // Don't send descriptive error messages in production
    response.statusMessage = process.env.NODE_ENV == 'production'
      ? response.statusMessage = 'error'
      : response.statusMessage = error.message

    response.status(500).end()
  }
}
