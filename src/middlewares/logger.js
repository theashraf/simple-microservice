import expressPino from "express-pino-logger"
import logger from "../modules/logger"
import config from "../config"

const expressLogger = expressPino({ logger })

export default app => {
	if (config.env === "development") {
		app.use(expressLogger)
	}
}
