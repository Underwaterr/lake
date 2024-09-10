import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"

export default createModel('burn_unit', {

  /*
  async create(data) {
    // uhhhh
  },

  async getById(id) {

  },
  */

  async getAll() {
    let burnUnits = await database.query(sql`
      SELECT
        burn_unit.id AS burn_unit_id,
        burn_unit.name,
        burn_unit.created_at,
        user_.email AS created_by_user_email,
        user_.id AS created_by_user_id
      FROM burn_unit
      JOIN user_
      ON burn_unit.created_by_id = user_.id
    `)

    // get surveys
    await Promise.all(
      burnUnits.map(async b=> {
        b.surveys = await database.query(sql`
          SELECT *
          FROM survey
          WHERE burn_unit_id = ${b.burn_unit_id};
        `)
      })
    )
    return burnUnits


    // get flights from survey id
    /*
    return await database.query(sql`
      SELECT
        burn_unit.name,
        burn_unit.created_at,
        user.id AS created_by_user_id,
        user.email AS created_by_user_email
      FROM burn_unit
        JOIN user_
        ON burn_unit.created_by_user.id = user_.id
    `)
    */
  }

})
