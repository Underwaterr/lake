import vine from '@vinejs/vine'

export let centroidSplitterValidator = vine.compile(
  vine.object({
    threshold: vine.number(),
    polygon: vine.array(vine.any())
  })
)

export let elevationModelValidator = vine.compile(
  vine.object({
    boundingBox: vine
      .array(vine.any())
      .fixedLength(4)
  })
)
