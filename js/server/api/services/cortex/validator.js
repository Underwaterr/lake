import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    threshold: vine.number(),
    polygon: vine.array(vine.any())
  })
)

