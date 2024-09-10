import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'


test('burn-unit', async t=> {

  let result = null
  let id = null
  let burnUnit = {
    name: "test-burn-unit",
    createdById: 1,
    organizationId: 1
  }

  console.log('\nget all')
  result = await call('burn-unit')
  console.log(result)

  console.log('\ninsert')
  result = await call('burn-unit', 'POST', burnUnit)
  id = result[0].id
  console.log(id, result)

  console.log('\nget')
  result = await call('burn-unit/' + id)
  console.log(result)


  console.log('\ndelete')
  result = await call('burn-unit/' + id, 'DELETE')
  console.log(result)

  /*
  console.log('\nupdate')
  result = await call('organization/' + id, 'PUT', {name: 'test-organization-renamed'})
  console.log(result)
  */
})

