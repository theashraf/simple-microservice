import logger from "../modules/logger"

const catchNotFound = (req, res, next) => {
	const error = new Error("Not Found")
	error.status = 404
	next(error)
}

const errorHandler = (err, req, res, next) => {
	const errorMessage = err.message
	const status = err.status || 500

	const error = {
		error: errorMessage,
		status
	}

	logger.error(error)

	res.status(status).json(error)
}

export default app => {
	app.use(catchNotFound)
	app.use(errorHandler)
}
