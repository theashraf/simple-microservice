import Joi from "@hapi/joi"

export const validateBody = validationSchema => (req, res, next) => {
	const { error, value } = Joi.validate(req.body, validationSchema)

	if (error) {
		const err = new Error(error.details[0].message)
		err.status = 400
		next(err)
	}

	req.body = value

	next()
}

/*
export const validateParams = validationSchema => (req, res, next) => {
	const { error, value } = Joi.validate(req.params, validationSchema)

	if (error) {
		const err = new Error(error)
		err.status = 400
		next(err)
	}

	req.params = value

	next()
}
*/

export const validateQuery = validationSchema => (req, res, next) => {
	const { error, value } = Joi.validate(req.query, validationSchema)

	if (error) {
		const err = new Error(error.details[0].message)
		err.status = 400
		next(err)
	}

	req.query = value

	next()
}
