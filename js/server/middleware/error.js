export default async function handleError(error, request, response, next) {
  process.stderr.write(`Something went wrong! (${error.message})\n`)

  // Don't send descriptive error messages in production
  response.statusMessage = process.env.NODE_ENV == 'production'
    ? response.statusMessage = 'error'
    : response.statusMessage = error.message

  response.status(500).end()
}
