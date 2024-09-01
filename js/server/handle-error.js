export default error=> {
  process.stderr.write("Server error! 😢\n")
  console.error(error)
}
