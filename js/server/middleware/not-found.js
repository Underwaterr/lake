// see: http://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses
export default function (request, response, next) {

  // Don't send descriptive error messages in production
  if(process.env.NODE_ENV == 'production') {
    response.status(500).end()
  }
  else {
    response.status(404).json({error: 'Not Found'})
  }
}
