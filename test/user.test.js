import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import request from './request.js'

await test('user', async t=> {

  await t.test('get all users finds only one', async t=> {
    let result = await request('GET', 'user')
    assert.ok(result.length==1, "array of one user")
    assert.ok(!result[0].password, "we do not get the user's password")
  })

  await t.test('add another user', async t=> {
    let newUser = {
      email: 'test@example.com',
      password: '1234',
      pilotLicense: 'test-license',
      organizationId: 1,
    }
    let result = await request('POST', 'user', newUser)
    assert.ok(result.id, "we get the new user's ID")
    assert.ok(!result.password, "we do not get the password")
  })

  await t.test('get all users now returns two', async t=> {
    let result = await request('GET', 'user')
    assert.ok(result.length==2, "array of both users")
  })

  await t.test('get the new user', async t=> {
    let result = await request('GET', 'user/2')
    assert.ok(!Array.isArray(result), 'should not return an array')
  })

  await t.test('delete the new user', async t=> {
    let result = await request('DELETE', 'user/2')
  })

  await t.test('get all users returns just one again', async t=> {
    let result = await request('GET', 'user')
    assert.ok(result.length==1, "old user not there any more!")
  })

  await t.test('get a user that is not there', async t=> {
    let result = await request('GET', 'user/3')
    assert.ok(result.error == "not found", "it should return an error")
  })

})
