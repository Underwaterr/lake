import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    status: vine.enum('NOT_STARTED', 'ACTIVE', 'COMPLETE'),
    start_time: vine.number(),
    duration: vine.number(),
    end_time: vine.number(),
    path: vine.any(),
    subpolygon: vine.any(),
    decco_id: vine.number(),
    pilot_id: vine.number()
  })
)
