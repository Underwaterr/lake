import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    user: vine.object({
      name: vine.string(),
      email: vine.string(),
      pilotLicense: vine.string(), // length?
      organizationId: vine.number()
    }),
    password: vine.string()
  })
)
