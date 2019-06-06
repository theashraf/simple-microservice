import express from "express"
// controllers
import jsonpatchController from "../controllers/jsonpatch"

// validation schemas
import jsonpatchValidations from "../validations/jsonpatch"

// middlewares
import auth from "../../middlewares/auth"
import { validateBody } from "../../middlewares/validation"

const Router = express.Router()

Router.post(
	"/apply",
	auth,
	validateBody(jsonpatchValidations.applyJsonpatchSchema),
	jsonpatchController.applyPatch
)

export default Router
