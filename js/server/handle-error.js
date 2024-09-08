
// This is not the error handling middleware,
// this is for when the server itself has an error
// AKA hopefully this function is never called

export default error=> {
  process.stderr.write("Server error! 😢\n")
  console.error(error)
}
