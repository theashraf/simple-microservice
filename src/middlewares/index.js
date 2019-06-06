import bodyParser from "./bodyParser"
import api from "./api"
import error from "./error"
import logger from "./logger"
import security from "./security"

export default app => {
	security(app)

	bodyParser(app)

	logger(app)

	api(app)

	error(app)
}
