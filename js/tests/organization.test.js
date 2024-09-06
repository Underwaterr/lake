import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'


let url = 'http://localhost:9000/'

test('entity organization', async t=> {
  await t.test('create', async t=> {
    let body = { a: true, b: false }
    let result = await call('organization', 'POST', body)
    t.todo()
  })
  await t.test('get all', async t=> {
    let result = await call('organization')
    assert.deepStrictEqual(result, { ok: true })
  })
  await t.test('get by id', async t=> {
    let response = await fetch(url + 'organization/1')
    let data = await response.text()
    assert.equal(data, 'default get by id')
  })
})


