import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    name: vine.string(),
    password: vine.string(),
    status: vine
      .enum(['OFFLINE', 'STANDBY', 'INITIALIZING', 'INFLIGHT'])
      .optional(),
    is_virtual: vine.boolean(),
    callsign: vine.string(),
    organization_id: vine.number()
  })
)
