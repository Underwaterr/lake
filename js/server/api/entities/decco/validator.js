import vine from '@vinejs/vine'

let statusEnum = vine.enum(['OFFLINE', 'STANDBY', 'INITIALIZING', 'INFLIGHT'])

export let setStatusValidator = vine.compile(
  vine.object({
    status: statusEnum
  })
)

export let defaultValidator = vine.compile(
  vine.object({
    decco: vine.object({
      name: vine.string(),
      status: statusEnum.optional(),
      isVirtual: vine.boolean(),
      callsign: vine.string(),
      organizationId: vine.number()
    }),
    password: vine.string()
  })
)
