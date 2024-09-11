import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    status: vine.enum(['NOT_STARTED', 'ACTIVE', 'COMPLETE']).optional(),
    start_time: vine.date().optional(),
    duration: vine.any().optional(),
    end_time: vine.date().optional(),
    path: vine.any().optional(),
    subpolygon: vine.any().optional(),
    decco_id: vine.number(),
    pilot_id: vine.number(),
    survey_id: vine.number()
  })
)
