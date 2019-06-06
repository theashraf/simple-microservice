import express from "express"

// controller
import thumbnailController from "../controllers/thumbnail"

// middlewares
import auth from "../../middlewares/auth"
import { validateBody } from "../../middlewares/validation"

// validation schemas
import thumbnailValidations from "../validations/thumbnail"

const Router = express.Router()

Router.post(
	"/create",
	auth,
	validateBody(thumbnailValidations.createThumbnailSchema),
	thumbnailController.createThumbnail
)

export default Router
