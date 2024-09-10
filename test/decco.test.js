import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'

await test('decco', async t=> {

  let result = null
  let id = null

  let decco = {
    name: 'test-decco',
    password: '1234',
    isVirtual: true,
    callsign: 'xxxABCD',
    organizationId: 1
  }

  await t.test('get all deccos', async t=> {
    console.log('\nGet all deccos...')
    result = await call('decco')
    console.log(result)
  })

  await t.test('insert decco', async t=> {
    console.log('\nInsert decco...')
    result = await call('decco', 'POST', decco)
    id = result[0].id
    console.log(id, result)
  })

  await t.test('get decco by id', async t=> {
    console.log('\nGet it...')
    result = await call('decco/' + id)
    console.log(result)
  })

  await t.test('set status of decco', async t=> {
    console.log('\nchange...')
    let x = { status: 'INFLIGHT' }
    result = await call('decco/set-status/' + id, 'PUT', x)
    console.log(result)
  })

  await t.test('delete decco', async t=> {
    console.log('\nDelete it...')
    result = await call('decco/' + id, 'DELETE')
    console.log(result)
  })
})
