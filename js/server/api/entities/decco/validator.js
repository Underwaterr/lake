import vine from '@vinejs/vine'

let statusEnum = vine.enum(['OFFLINE', 'STANDBY', 'INITIALIZING', 'INFLIGHT'])

export let setStatusValidator = vine.compile(
  vine.object({
    status: statusEnum
  })
)

export let defaultValidator = vine.compile(
  vine.object({
    name: vine.string(),
    password: vine.string(),
    status: statusEnum.optional(),
    is_virtual: vine.boolean(),
    callsign: vine.string(),
    organization_id: vine.number()
  })
)
