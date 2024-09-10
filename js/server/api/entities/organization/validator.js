import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    name: vine.string()
  })
)
