import JWT from "jsonwebtoken"
import config from "../config"

export const generateToken = payload =>
	JWT.sign(payload, config.JWT_SECRET, {
		expiresIn: config.JWT_EXPRIRES_IN
	})

export const verifyToken = token => JWT.verify(token, config.JWT_SECRET)
