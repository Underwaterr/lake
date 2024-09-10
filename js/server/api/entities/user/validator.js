import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    email: vine.string(),
    password: vine.string(),
    pilot_license: vine.string(),
    organization_id: vine.number()
  })
)
