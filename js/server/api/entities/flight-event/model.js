import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('FlightEvent', {

  // we gotta do these things "manually" cuz of PostGIS stuff

  async create(data) {
    let { description, level, location, startTime, deccoId, flightId} = data
    return await database.query(sql`
      INSERT INTO "FlightEvent"
      (description, level, "startTime", "deccoId", "flightId", location)
      VALUES (${description}, ${level}, ${startTime}, ${deccoId}, ${flightId}, ST_GeogFromGeoJSON(${location}))
      RETURNING *;`)
  },

  async getAll(flightId=null) {

    if(flightId) return await database.query(sql`
      SELECT
        id, acknowledged, description, level, "startTime", type, "deccoId", "flightId",
        ST_AsGeoJSON(location)::json AS location
      FROM "FlightEvent"
      WHERE "FlightEvent"."flightId" = ${flightId};
    `)

    else return await database.query(sql`
      SELECT
        id, acknowledged, description, level, "startTime", type, "deccoId", "flightId",
        ST_AsGeoJSON(location)::json AS location
      FROM "FlightEvent";
    `)
  },

  async getById(id) {
    return reduce(await database.query(sql`
      SELECT
        id, acknowledged, description, level, "startTime", type, "deccoId", "flightId",
        ST_AsGeoJSON(location)::json AS location
      FROM "FlightEvent"
      WHERE id = ${id};
    `))
  }
})
