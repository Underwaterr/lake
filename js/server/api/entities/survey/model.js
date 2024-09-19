import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('Survey', {
  async getById(id) {
    // get survey
    let survey = await database.query(sql`
      SELECT * FROM "Survey"
      WHERE id = ${id}
    `)
    // get the survey's associated flights
    survey.flights = await database.query(sql`
      SELECT * FROM "Flight"
      WHERE "surveyId" = ${id}
    `)
    return reduce(survey)
  },

})
