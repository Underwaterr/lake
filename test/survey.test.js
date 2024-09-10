import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'


test('survey', async t=> {

  let result = null
  let id = null
  let survey = {
    name: "test-survey",
  }

  /*
  console.log('\nget all')
  result = await call('survey')
  console.log(result)

  console.log('\ninsert')
  result = await call('survey', 'POST', burnUnit)
  id = result[0].id
  console.log(id, result)

  console.log('\ndelete')
  result = await call('survey/' + id, 'DELETE')
  console.log(result)

  console.log('\nupdate')
  result = await call('survey/' + id, 'PUT', {name: 'test-organization-renamed'})
  console.log(result)

  console.log('\nget')
  result = await call('survey/' + id)
  console.log(result)

  */
})

