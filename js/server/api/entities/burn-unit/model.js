import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"

export default createModel('BurnUnit', {

  async getAll() {
    let burnUnits = await database.query(sql`
      SELECT
        "BurnUnit".id AS "burnUnitId",
        "BurnUnit".name,
        "BurnUnit"."createdAt",
        "User".email AS "createdByUserEmail",
        "User".id AS "createdByUserId"
      FROM "BurnUnit"
      JOIN "User"
      ON "BurnUnit"."createdById" = "User".id
    `)

    // get surveys
    await Promise.all(
      burnUnits.map(async b=> {
        b.surveys = await database.query(sql`
          SELECT *
          FROM "Survey"
          WHERE "burnUnitId" = ${b.burn_unit_id};
        `)
      })
    )
    return burnUnits
  }

})
