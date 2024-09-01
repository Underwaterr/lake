// Array of each environment variable we expect
let expectedEnvironmentVariables = [
  'PORT'
]

// For each environment variable,
for(let expectedEnvironmentVariable of expectedEnvironmentVariables) {
  // if the value is `undefined` throw an error
  if(process.env[expectedEnvironmentVariable] == undefined) {
    throw new Error(`Environment variable ${expectedEnvironmentVariable} not defined`)
  }
}
