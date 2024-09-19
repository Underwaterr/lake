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
      VALUES (${description}, ${level}, ${startTime}, ${deccoId}, ${flightId}, ST_GeographyFromText(${location}))
      RETURNING *;`)
  },

  async getAll() {
    let flightEvents = await database.query(sql`
      SELECT
        id, acknowledged, description, level, "startTime", type, "deccoId", "flightId",
        st_asgeojson(location) AS location
      FROM "FlightEvent";`)
    return flightEvents.map(f=> {
      f.location = JSON.parse(f.location)
      return f
    })
  },

  async getById(id) {
    let flightEvent = await database.query(sql`
      SELECT
        id, acknowledged, description, level, "startTime", type, "deccoId", "flightId",
        st_asgeojson(location) AS location
      FROM "FlightEvent"
      WHERE id = ${id};`)
    flightEvent = flightEvent.map(f=> {
      f.location = JSON.parse(f.location)
      return f
    })
    return reduce(flightEvent)
  }
})
