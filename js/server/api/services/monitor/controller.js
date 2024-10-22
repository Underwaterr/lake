import webSocketStore from '../../../web-socket/store.js'
import { sql } from "squid/pg.js"
import database from '../../../../database.js'
import reduce from '../../entities/reduce.js'

export default {

  async webSockets(request, response) {
    let organizationId = parseInt(request.query['organizationId'])
    let store = webSocketStore.getStore()
    console.log(store)
    response.json(store.get(organizationId))
  },

  async database(request, response) {
    // 90% or above is excellent
    let result = reduce(await database.query(sql`
      SELECT SUM(blks_hit) * 100 / SUM(blks_hit+blks_read) AS "hitRatio"
      FROM pg_stat_database
    ;`))
    response.json(result)
  }
}
