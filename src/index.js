import app from "./app"
import logger from "./modules/logger"
import config from "./config"

const server = app.listen(config.PORT, () =>
	logger.info(`Starting server on port: ${config.PORT}`)
)

process.on("SIGTERM", () => {
	logger.info("Closing http server.")
	server.close(() => {
		logger.info("Http server closed.")
		process.exit(0) // eslint-disable-line no-process-exit
	})
})
