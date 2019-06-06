import Joi from "@hapi/joi"

const applyJsonpatchSchema = Joi.object().keys({
	originalDoc: Joi.object().required(),
	patch: Joi.array().required()
})

export default { applyJsonpatchSchema }
