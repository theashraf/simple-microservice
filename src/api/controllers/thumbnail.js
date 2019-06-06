import { resize, download } from "../../services/imageProcessing"

const createThumbnail = async (req, res, next) => {
	const { imgUrl } = req.body

	res.type("jpeg")
	try {
		const stream = await download(imgUrl)
		stream.pipe(resize(50, 50)).pipe(res)
	} catch (error) {
		error.status = 400
		next(error)
	}
}

export default { createThumbnail }
