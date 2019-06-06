import app from "./app"
import logger from "./modules/logger"
import config from "./config"

const port = config.port

app.listen(port, () => logger.info(`server is running on port: ${port}`))
