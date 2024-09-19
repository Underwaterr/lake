import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    user: vine.object({
      email: vine.string(),
      pilotLicense: vine.string(),
      organizationId: vine.number()
    }),
    password: vine.string()
  })
)
