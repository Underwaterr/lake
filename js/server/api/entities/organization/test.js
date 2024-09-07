import { test, mock } from 'node:test'
import { strict as assert } from 'node:assert'
import noop from '@stdlib/utils-noop'

test('organization', async t=> {

  await t.test('model', async t=> {

    let { default: model } = await import('./model.js')
    let { default: database } = await import('../../../../database.js')


    await t.test('create', async t=> {

      // Arrange
      let organization = { name: 'test-organization' }
      mock.method(database, 'query', noop)

      // Act
      await model.create(organization)

      // Assert
      assert.equal(
        database.query.mock.callCount(), 1,
        'database is queried once')
      assert.equal(
        database.query.mock.calls[0].arguments.length, 2,
        'database query includes value parameters')
      assert.deepStrictEqual(
        database.query.mock.calls[0].arguments[1], [organization.name],
        'verify value parameters')
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
        'database query does not include value parameters')
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


    await t.test('delete', async t=> {

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
      let organization = { name: 'test-organization' }
      let ctx = { request: { body: organization } }

      // Act
      controller.create(ctx)

      // Assert
      assert.equal(
        model.create.mock.callCount(), 1,
        'create method called')
      assert.deepStrictEqual(
        model.create.mock.calls[0].arguments[0], organization,
        'pass in the organization')
    })

    await t.test('get all', async t=> {

      // Arrange
      mock.method(model, 'getAll',  noop)
      let ctx = {}

      // Act
      controller.getAll(ctx)

      // Assert
      assert.equal(1, model.getAll.mock.callCount())
    })

    await t.test('get by id', async t=> {

      // Arrange
      mock.method(model, 'getById', noop)
      let ctx = { params: { id: 12 } }

      // Act
      controller.getById(ctx)

      // Assert
      assert.equal(1, model.getById.mock.callCount())
      assert.equal(ctx.params.id, model.getById.mock.calls[0].arguments[0])
    })

    await t.test('update', async t=> {

      // Arrange
      mock.method(model, 'update',  noop)
      let organization = { name: 'test-organization' }
      let ctx = { params: { id: 12 }, request: { body: organization } }

      // Act
      controller.update(ctx)

      // Assert
      assert.equal(
        model.update.mock.callCount(), 1,
        'called once')
      assert.equal(
        model.update.mock.calls[0].arguments[0], ctx.params.id,
        'pass in id')
      assert.deepStrictEqual(
        model.update.mock.calls[0].arguments[1], organization,
        'pass in the organization')
    })

    await t.test('delete', async t=> {

      // Arrange
      mock.method(model, 'delete',  noop)
      let ctx = { params: { id: 12 } }

      // Act
      controller.delete(ctx)

      // Assert
      assert.equal(
        model.delete.mock.callCount(), 1,
        'delete method called once')
      assert.equal(
        model.update.mock.calls[0].arguments[0], ctx.params.id,
        'pass in id')
    })
  })
})
