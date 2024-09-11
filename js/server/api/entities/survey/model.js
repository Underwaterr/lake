import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('survey', {
  async getById(id) {
    // get survey
    let survey = await database.query(sql`
      SELECT * FROM survey
      WHERE id = ${id}
    `)
    // get the survey's associated flights
    survey.flights = await database.query(sql`
      SELECT * FROM flight
      WHERE survey_id = ${id}
    `)
    return reduce(survey)
  },

})
