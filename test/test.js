import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'


test('organization', async t=> {

  let result = null
  let id = null

  console.log('\nInsert org...')
  result = await call('organization', 'POST', {name: 'new-organization'})
  id = result[0].id
  console.log(id, result)

  console.log('\nUpdate it...')
  result = await call('organization/' + id, 'PUT', {name: 'new-organization-renamed'})
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

await test('user_', async t=> {

  let result = null
  let id = null

  let user = {
    email: 'test2@example.com',
    password: '1234',
    pilotLicense: 'test-license',
    organizationId: 1
  }

  await t.test('get all users', async t=> {
    console.log('\nGet all users...')
    result = await call('user')
    console.log(result)
  })

  await t.test('insert user', async t=> {
    console.log('\nInsert user...')
    result = await call('user', 'POST', user)
    id = result[0].id
    console.log(id, result)
  })

  await t.test('get user by id', async t=> {
    console.log('\nGet it...')
    result = await call('user/' + id)
    console.log(result)
  })

  await t.test('delete user', async t=> {
    console.log('\nDelete it...')
    result = await call('user/' + id, 'DELETE')
    console.log(result)
  })
})

await test('decco', async t=> {

  let result = null
  let id = null

  let decco = {
    name: 'southern-flannel',
    password: '1234',
    is_virtual: true,
    callsign: 'xxxABCD',
    organization_id: 1
  }

  await t.test('get all deccos', async t=> {
    console.log('\nGet all deccos...')
    result = await call('decco')
    console.log(result)
  })

  /*
  await t.test('insert user', async t=> {
    console.log('\nInsert user...')
    result = await call('user', 'POST', user)
    id = result[0].id
    console.log(id, result)
  })

  await t.test('get user by id', async t=> {
    console.log('\nGet it...')
    result = await call('user/' + id)
    console.log(result)
  })

  await t.test('delete user', async t=> {
    console.log('\nDelete it...')
    result = await call('user/' + id, 'DELETE')
    console.log(result)
  })
  */
})
