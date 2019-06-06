import Joi from "@hapi/joi"

const loginSchema = Joi.object().keys({
	username: Joi.string().required(),
	password: Joi.string().required()
})

export default { loginSchema }
