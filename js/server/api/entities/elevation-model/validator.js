import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    url: vine.string().optional(),
    boundingBox: vine.any()
  })
)
