import { verifyToken } from "../services/auth"
import { findById } from "../api/models/user"

export default async (req, res, next) => {
	let token = req.headers.authorization

	if (token && token.startsWith("Bearer ")) {
		// Remove Bearer from string
		token = token.slice(7, token.length)
	} else {
		const err = new Error("unauthorized")
		err.status = 401

		next(err)
	}

	try {
		const { id } = await verifyToken(token)
		const user = findById(id)

		if (!user) {
			const err = new Error("unauthorized")
			err.status = 401
			next(err)
		}

		req.user = user

		next()
	} catch (error) {
		const err = new Error(error.message)
		err.status = 401

		next(err)
	}
}
