import { test, mock } from 'node:test'
import { strict as assert } from 'node:assert'
import noop from '@stdlib/utils-noop'

test('decco', async t=> {

  await t.test('model', async t=> {

    let { default: model } = await import('./model.js')
    let { default: database } = await import('../../../../database.js')

    await t.test('create', async t=> {

      // Arrange
      let decco = { name: 'test-decco', password: 'test-password' }
      mock.method(database, 'query', noop)

      // Act
      await model.create(decco)

      // Assert
      assert.equal(
        database.query.mock.callCount(), 1,
        'database is queried once')
      assert.equal(
        database.query.mock.calls[0].arguments.length, 1,
        'database query recieves argument')
    })

    await t.test('getAll', async t=> {

      // Arrange
      mock.method(database, 'query', noop)

      // Act
      await model.getAll()

      // Assert
      assert.equal(
        database.query.mock.callCount(), 1,
        'database is queried once')
      assert.equal(
        database.query.mock.calls[0].arguments.length, 1,
        'database query called with argument')
    })

    await t.test('getById', async t=> {

      // Arrange
      mock.method(database, 'query', noop)

      // Act
      await model.getAll()

      // Assert
      assert.equal(1, database.query.mock.callCount())
      assert.equal(1, database.query.mock.calls[0].arguments.length)
    })


    await t.test('update', async t=> {

      // Arrange
      mock.method(database, 'query', noop)

      // Act
      await model.getAll()

      // Assert
      assert.equal(1, database.query.mock.callCount())
      assert.equal(1, database.query.mock.calls[0].arguments.length)
    })


    await t.test('destroy', async t=> {

      // Arrange
      mock.method(database, 'query', noop)

      // Act
      await model.getAll()

      // Assert
      assert.equal(1, database.query.mock.callCount())
      assert.equal(1, database.query.mock.calls[0].arguments.length)
    })
  })

  await t.test('controller', async t=> {

    let { default: controller } = await import('./controller.js')
    let { default: model } = await import('./model.js')


    await t.test('create', async t=> {

      // Arrange
      mock.method(model, 'create',  noop)
      let decco = { name: 'test-decco' }
      let request = { body: decco }
      let response = { json: mock.fn() }

      // Act
      await controller.create(request, response)

      // Assert
      assert.equal(
        model.create.mock.callCount(), 1,
        'create method called')
      assert.equal(
        response.json.mock.callCount(), 1,
        'json method called')
      assert.deepStrictEqual(
        model.create.mock.calls[0].arguments[0], decco,
        'pass in the decco')
    })

    await t.test('get all', async t=> {

      // Arrange
      mock.method(model, 'getAll',  noop)
      let request = {}
      let response = { json: mock.fn() }

      // Act
      await controller.getAll(request, response)

      // Assert
      assert.equal(1, model.getAll.mock.callCount())
      assert.equal(
        response.json.mock.callCount(), 1,
        'json method called')
    })

    await t.test('get by id', async t=> {

      // Arrange
      mock.method(model, 'getById', noop)
      let request = { params: { id: 12 } }
      let response = { json: mock.fn() }

      // Act
      await controller.getById(request, response)

      // Assert
      assert.equal(1, model.getById.mock.callCount())
      assert.equal(request.params.id, model.getById.mock.calls[0].arguments[0])
      assert.equal(
        response.json.mock.callCount(), 1,
        'json method called')
    })

    await t.test('update', async t=> {

      // Arrange
      mock.method(model, 'update',  noop)
      let decco = { name: 'test-decco' }
      let request = { params: { id: 12 }, body: decco }
      let response = { json: mock.fn() }

      // Act
      await controller.update(request, response)

      // Assert
      assert.equal(
        model.update.mock.callCount(), 1,
        'called once')
      assert.equal(
        response.json.mock.callCount(), 1,
        'json method called')
      assert.equal(
        model.update.mock.calls[0].arguments[0], request.params.id,
        'pass in id')
      assert.deepStrictEqual(
        model.update.mock.calls[0].arguments[1], decco,
        'pass in the decco')
    })

    await t.test('destroy', async t=> {

      // Arrange
      mock.method(model, 'destroy',  noop)
      let request = { params: { id: 12 } }
      let response = { json: mock.fn() }

      // Act
      await controller.destroy(request, response)

      // Assert
      assert.equal(
        model.destroy.mock.callCount(), 1,
        'destroy method called once')
      assert.equal(
        response.json.mock.callCount(), 1,
        'json method called')
      assert.equal(
        model.update.mock.calls[0].arguments[0], request.params.id,
        'pass in id')
    })
  })

})
