export default async function handleError(error, request, response, next) {

  console.log('Error cause', error.cause)
  console.log('Error code', error.code)
  console.log('Erorr message', error.messages)
  console.log('Error content', JSON.stringify(error))
  console.log('Error', error)

  // validation errors
  if(error.code == 'E_VALIDATION_ERROR') {
    response.status(422).json({ error: error.messages })
  }

  // all other errors
  else {
    // Don't send descriptive error messages in production
    response.statusMessage = process.env.NODE_ENV == 'production'
      ? response.statusMessage = 'error'
      : response.statusMessage = error.message

    response.status(500).end()
  }
}
