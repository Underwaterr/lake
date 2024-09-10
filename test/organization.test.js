import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'


test('organization', async t=> {

  let result = null
  let id = null

  console.log('\nInsert org...')
  result = await call('organization', 'POST', {name: 'test-organization'})
  id = result[0].id
  console.log(id, result)

  console.log('\nUpdate it...')
  result = await call('organization/' + id, 'PUT', {name: 'test-organization-renamed'})
  console.log(result)

  console.log('\nGet it...')
  result = await call('organization/' + id)
  console.log(result)

  console.log('\nDelete it...')
  result = await call('organization/' + id, 'DELETE')
  console.log(result)

  console.log('\nGet all of them...')
  result = await call('organization')
  console.log(result)
})

