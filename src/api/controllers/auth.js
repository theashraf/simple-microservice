import { findByUsernameAndPass } from "../models/user"
import { generateToken } from "../../services/auth"

const login = async (req, res, next) => {
	const { username, password } = req.body

	const user = findByUsernameAndPass(username, password)

	if (!user) {
		const err = new Error("Invalid username or password")
		err.status = 400
		next(err)
		return
	}

	const token = await generateToken({ id: user.id })

	res.status(200).json({ token })
}

export default { login }
