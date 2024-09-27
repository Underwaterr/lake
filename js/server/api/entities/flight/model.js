import createModel from '../create-model.js'
import reduce from '../reduce.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"

export default createModel('Flight', {
  async create({surveyId, subpolygon}) {
    return reduce(await database.query(sql`
      INSERT INTO "Flight" ("surveyId", "subpolygon")
      VALUES ( ${surveyId}, ST_GeomFromGeoJSON(${subpolygon}) )
      RETURNING
        "id", "status", "surveyId",
        ST_AsGeoJSON(subpolygon)::json AS subpolygon
      ;`
    ))
  },

  async getAll() {
    return await database.query(sql`
      SELECT
        status, "startTime", duration, "endTime",
        "deccoId", "pilotId", "surveyId",
        St_AsGeoJSON(path)::json AS path,
        ST_AsGeoJSON(subpolygon)::json AS subpolygon
      FROM "Flight";
    `)
  }

})
