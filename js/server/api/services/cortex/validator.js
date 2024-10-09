import vine from '@vinejs/vine'

export let centroidSplitterValidator = vine.compile(
  vine.object({
    threshold: vine.number(),
    polygon: vine.array(vine.any())
  })
)

export let generateElevationModelValidator = vine.compile(
  vine.object({
    boundingBox: vine
      .array(vine.number())
      .fixedLength(4)
  })
)
