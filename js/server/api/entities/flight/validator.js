import vine from '@vinejs/vine'

export default vine.compile(
  vine.object({
    status: vine.enum(['NOT_STARTED', 'ACTIVE', 'COMPLETE']).optional(),
    startTime: vine.date().optional(),
    duration: vine.any().optional(),
    endTime: vine.date().optional(),
    path: vine.any().optional(),
    subpolygon: vine.any(),
    deccoId: vine.number().optional(),
    pilotId: vine.number().optional(),
    surveyId: vine.number()
  })
)
