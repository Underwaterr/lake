import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"

export default createModel('BurnUnit', {
  async getAll() {
    return await database.query(sql`
      SELECT
        "BurnUnit".id,
        "BurnUnit"."createdAt",
        "BurnUnit".name,

        json_build_object(
          'id', "User".id,
          'email', "User".email,
          'name', "User".name
        ) AS "createdByUser",

        json_build_object(
          'type', "Survey".type,
          json_build_object(
            'status', "Flight".status
          ) AS "flights",
        ) AS "surveys"

      FROM "BurnUnit"
        JOIN "User"
        ON "User".id = "BurnUnit"."createdById"
        JOIN "Survey"
        ON "Survey"."burnUnitId" = "BurnUnit".id
          JOIN "Flight"
          ON "Flight"."surveyId" = "Survey".id;
    `)
  }
})
