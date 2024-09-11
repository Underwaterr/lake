import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import database from '../../../database.js'
import reduce from './reduce.js'

export default function (tableName, overrides={}) {
  let defaults = {
    async create(data) {
      return await database.query(sql`
        INSERT INTO ${sql.raw(tableName)}
        ${spreadInsert(data)}
        RETURNING *;`
      )
    },

    async getAll() {
      return await database.query(sql`
        SELECT * FROM ${sql.raw(tableName)}
      `)
    },

    async getById(id) {
      return reduce(await database.query(sql`
        SELECT * FROM ${sql.raw(tableName)}
        WHERE id = ${id}
      `))
    },

    async update(id, data) {
      return await database.query(sql`
        UPDATE ${sql.raw(tableName)}
        SET ${spreadUpdate(data)}
        WHERE id = ${id}
        RETURNING *;
      `)
    },

    async destroy(id) {
      return await database.query(sql`
        DELETE FROM ${sql.raw(tableName)}
        WHERE id = ${id}
        RETURNING *;
      `)
    }
  }

  return { ...defaults, ...overrides }
}
