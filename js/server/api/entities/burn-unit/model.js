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
      RETURNING
        "createdAt", "createdById", "id", "name", "organizationId",
        ST_AsGeoJSON(polygon)::json AS polygon,
        ST_AsGeoJSON(subpolygons)::json AS subpolygons
      ;`
    ))
  },
  async update(id, data) {
    return reduce(await database.query(sql`
      UPDATE "BurnUnit"
      SET
        polygon = ST_GeomFromGeoJSON(${data.polygon}),
        subpolygons = ST_GeomFromGeoJSON(${data.subpolygons})
      WHERE id = ${id}
      RETURNING
        ST_AsGeoJSON(polygon)::json AS polygon,
        ST_AsGeoJSON(subpolygons)::json AS subpolygons;
    `))
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
              'createdAt', "Survey"."createdAt",
              'flights', (
                SELECT json_agg(
                  json_build_object(
                    'deccoId', "Flight"."deccoId",
                    'duration', "Flight".duration,
                    'endTime', "Flight"."endTime",
                    'id', "Flight".id,
                    'path', ST_AsGeoJSON("Flight".path)::json,
                    'pilotId', "Flight"."pilotId",
                    'startTime', "Flight"."startTime",
                    'status', "Flight".status,
                    'subpolygon', ST_AsGeoJSON("Flight".subpolygon)::json,
                    'surveyId', "Flight"."surveyId"
                  )
                )
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
