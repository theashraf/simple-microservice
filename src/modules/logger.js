import pino from "pino"
import prettifier from "pino-pretty"
import config from "../config"

const logger = pino({
	level: config.logLevel,
	prettifier,
	prettyPrint: { colorize: true }
})

export default logger
