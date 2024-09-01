import { strict as assert } from 'node:assert'
import test from 'node:test'

let url = 'http://localhost:9000/'

test('Services Endpoint', async t=> {
  let response = await fetch(url + 'services')
  let data = await response.text()
  assert.equal(data, 'test services endpoint')
})

test('Entities Endpoint', async t=> {
  let response = await fetch(url + 'entities')
  let data = await response.text()
  assert.equal(data, 'test entities endpoint')
  assert.notEqual(data, 'test services endpoint')
})
