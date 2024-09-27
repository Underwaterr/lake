import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('BurnUnit', {
  async create({name, createdById, organizationId, polygon, subpolygons}) {
    return reduce(await database.query(sql`
      INSERT INTO "BurnUnit"
        ("name", "createdById", "organizationId", "polygon", "subpolygons")
      VALUES (
        ${name}, ${createdById}, ${organizationId}, 
        ST_GeomFromGeoJSON(${polygon}),
        ST_GeomFromGeoJSON(${subpolygons})
      )
      RETURNING *;`
    ))
  },
  async getAll() {
    let burnUnits = await database.query(sql`
      SELECT
        "BurnUnit"."createdAt",
        json_build_object(
          'id', "User".id,
          'email', "User".email,
          'name', "User".name
        ) AS "createdByUser",
        "BurnUnit".id,
        "BurnUnit".name,
        "BurnUnit"."organizationId",
        ST_AsGeoJSON("BurnUnit".polygon)::json AS polygon,
        ST_AsGeoJSON("BurnUnit".subpolygons)::json AS subpolygons,
        COALESCE(
          json_agg(
            json_build_object(
              'id', "Survey".id,
              'type', "Survey".type,
              'flights', (
                SELECT json_agg(row_to_json("Flight"))
                FROM "Flight"
                WHERE "Flight"."surveyId" = "Survey".id
              )
            )
          )
          FILTER (WHERE "Survey".id IS NOT NULL), '[]'
        ) AS "surveys"
      FROM "BurnUnit"
      LEFT JOIN "Survey"
      ON "Survey"."burnUnitId" = "BurnUnit".id
      LEFT JOIN "User"
      ON "User".id = "BurnUnit"."createdById"
      GROUP BY "BurnUnit".id, "User".id;
    `)
    return burnUnits
  }
})
