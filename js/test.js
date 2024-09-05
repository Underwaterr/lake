import { strict as assert } from 'node:assert'
import { mock, test } from 'node:test'


import controller from './server/api/entities/organization/controller.js'
let noop = ()=> {}

let url = 'http://localhost:9000/'

test('entity organization', async t=> {
  await t.test('woo', async t=> {
    let router = await import('./server/api/entities/organizaiton/router.js')
    t.mock.method(controller, 'getAll', noop)
    await controller.getAll()
    assert.equal(controller.getAll.mock.callCount(), 1);
  })
  await t.test('get all', async t=> {
    let response = await fetch(url + 'organization')
    let data = await response.text()
    assert.equal(data, 'default get all')
  })
  await t.test('get by id', async t=> {
    let response = await fetch(url + 'organization/1')
    let data = await response.text()
    assert.equal(data, 'default get by id')
  })
})


