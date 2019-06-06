import Joi from "@hapi/joi"

const createThumbnailSchema = Joi.object().keys({
	imgUrl: Joi.string()
		.uri()
		.required()
})

export default { createThumbnailSchema }
