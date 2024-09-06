import { test, mock } from 'node:test'
import { strict as assert } from 'node:assert'

import controller from './controller.js'
import model from './model.js'

test('organization controller', async t=> {
  mock.method(model, 'create', ()=> {})
  console.log(model.create.mock.callCount())
  controller.create({})
  console.log(model.create.mock.callCount())

})
/*
let result = model.create.mock.calls.length
console.log(result)
controller.create({})
result = model.create.mock.calls.length
console.log(result)
*/

/*
import esmock from 'esmock'

let counter = 0
test('organization controller', async t=> {
  let  controller = await esmock('./controller.js', {
    './model.js': {
      create() {
        counter++
        return true
      }
    }
  })
  await t.test('create', async t=> {
    console.log(counter)
    controller.create({})
    console.log(counter)
  })
})
*/
