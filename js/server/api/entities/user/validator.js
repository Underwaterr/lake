import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    user: vine.object({
      email: vine.string(),
      pilot_license: vine.string(),
      organization_id: vine.number()
    }),
    password: vine.string()
  })
)
