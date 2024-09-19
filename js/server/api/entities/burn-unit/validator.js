import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    createdAt: vine.date().optional(),
    name: vine.string(),
    organizationId: vine.number(),
    createdById: vine.number(),
    polygon: vine.any()
  })
)
