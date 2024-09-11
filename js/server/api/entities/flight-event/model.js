import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('flight_event', {

  async create(data) {
    let { description, level, location, start_time, decco_id, flight_id} = data
    return await database.query(sql`
      INSERT INTO flight_event
      (description, level, start_time, decco_id, flight_id, location)
      VALUES (${description}, ${level}, ${start_time}, ${decco_id}, ${flight_id}, ST_GeographyFromText(${location}))
      RETURNING *;`)
  },

  async getAll() {
    let flightEvents = await database.query(sql`
      SELECT
        id, acknowledged, description, level, start_time, type, decco_id, flight_id,
        st_asgeojson(location) AS location
      FROM flight_event;`)
    return flightEvents.map(f=> {
      f.location = JSON.parse(f.location)
      return f
    })
  },

  async getById(id) {
    let flightEvent = await database.query(sql`
      SELECT
        id, acknowledged, description, level, start_time, type, decco_id, flight_id,
        st_asgeojson(location) AS location
      FROM flight_event
      WHERE id = ${id};`)
    flightEvent = flightEvent.map(f=> {
      f.location = JSON.parse(f.location)
      return f
    })
    return reduce(flightEvent)
  }
})
