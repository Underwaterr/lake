import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import call from './call.js'


test('organization', async t=> {

  await call('organization', 'POST', {name: 'new-organization'})
  let organizations = await call('organization')

})
