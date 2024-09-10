import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    created_at: vine.number(),
    name: vine.string(),
    organization_id: vine.number(),
    created_by_id: vine.number()
  })
)
