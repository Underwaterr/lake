import vine from '@vinejs/vine'

export let loginUserValidator = vine.compile(
  vine.object({
    email: vine.string(),
    password: vine.string()
  })
)

export let loginDeccoValidator = vine.compile(
  vine.object({
    name: vine.string(),
    organizationId: vine.number(),
    password: vine.string()
  })
)
