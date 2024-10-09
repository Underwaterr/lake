import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('ElevationModel', {

  async create({boundingBox}) {
    return reduce(await database.query(sql`
      INSERT INTO "ElevationModel" ("boundingBox")
      VALUES ( ST_GeomFromGeoJSON(${boundingBox}) )
      RETURNING
        "id", "url",
        ST_AsGeoJSON("boundingBox")::json AS "boundingBox"
      ;`
    ))
  },

  async getById(id) {
    return reduce(await database.query(sql`
      SELECT
        id, url,
        ST_AsGeoJSON("boundingBox")::json AS "boundingBox"
      FROM "ElevationModel"
      WHERE id = ${id};
    `))
  },

  async getAll() {
    return await database.query(sql`
      SELECT
        id, url,
        ST_AsGeoJSON("boundingBox")::json AS "boundingBox"
      FROM "ElevationModel";
    `)
  }
})
