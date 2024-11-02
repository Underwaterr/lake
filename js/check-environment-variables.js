// Array of each environment variable we expect
let expectedEnvironmentVariables = [
  'PORT', 'SESSION_SECRET', 'FRONT_END_URL', 'DOWNLOAD_DIRECTORY',
  'PGUSER', 'PGPASSWORD', 'PGHOST', 'PGPORT', 'PGDATABASE'
]

// For each environment variable,
for(let expectedEnvironmentVariable of expectedEnvironmentVariables) {
  // if the value is `undefined` throw an error
  if(process.env[expectedEnvironmentVariable] == undefined) {
    throw new Error(`Environment variable ${expectedEnvironmentVariable} not defined`)
  }
}
