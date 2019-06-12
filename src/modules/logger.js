import pino from "pino"
import prettifier from "pino-pretty"
import config from "../config"

const logger = pino({
	level: config.NODE_ENV === "test" ? "silent" : config.LOG_LEVEL,
	prettifier,
	prettyPrint: { colorize: true }
})

export default logger
