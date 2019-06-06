import express from "express"

// controller
import authController from "../controllers/auth"

// validation schemas
import authValidation from "../validations/auth"

// middlewares
import { validateBody } from "../../middlewares/validation"

const Router = express.Router()

Router.post(
	"/login",
	validateBody(authValidation.loginSchema),
	authController.login
)

export default Router
