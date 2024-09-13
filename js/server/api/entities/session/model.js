import { sql } from "squid/pg.js"
import database from '../../../../database.js'

export default {
  async getAll() {
    return await database.query(sql`SELECT sid, sess, expire FROM session;`)
  },
  async destroy(sid) {
    return await database.query(sql`
      DELETE FROM session
      WHERE sid = ${sid};
    `)
  }
}
