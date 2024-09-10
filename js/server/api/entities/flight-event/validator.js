import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    acknowledged: vine.boolean(),
    description: vine.string(),
    level: vine.enum(['LOW', 'MEDIUM', 'HIGH']),
    start_time: vine.number(),
    type: vine.enum(['TASK_STATUS', 'STATE_MACHINE', 'FLIGHT_CONTROL', 'FAILSAFE', 'INFO']),
    location: vine.any(),
    decco_id: vine.number(),
    flight_id: vine.number()
  })
)
