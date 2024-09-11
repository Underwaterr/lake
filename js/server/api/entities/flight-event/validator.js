import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    acknowledged: vine.boolean().optional(),
    description: vine.string(),
    level: vine.enum(['LOW', 'MEDIUM', 'HIGH']),
    location: vine.any(),
    start_time: vine.date({ formats: { utc: true } }),
    type: vine.enum(['TASK_STATUS', 'STATE_MACHINE', 'FLIGHT_CONTROL', 'FAILSAFE', 'INFO']).optional(),

    decco_id: vine.number(),
    flight_id: vine.number()
  })
)
