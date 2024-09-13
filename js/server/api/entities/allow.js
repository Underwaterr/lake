import includes from 'lodash.includes'

export default allowedRoles=> (request, response, next)=> {
  let authorized = includes(allowedRoles, request.session.user.role)
  if(authorized) next()
  else next(new Error('account is not authorized'))
}
