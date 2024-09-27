import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    type: vine.enum(['PRE', 'PERI', 'POST']),
    burnUnitId: vine.number()
  })
)
