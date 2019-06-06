import JWT from "jsonwebtoken"
import config from "../config"

export const generateToken = payload =>
	JWT.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.expiresIn
	})

export const verifyToken = token => JWT.verify(token, config.jwt.secret)
