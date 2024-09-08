export default function(request, response, next) {
  if(request.session.authenticated) next()
  else throw new Error("session not authenticated")
}
