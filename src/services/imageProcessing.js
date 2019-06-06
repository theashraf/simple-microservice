import axios from "axios"
import sharp from "sharp"

export const download = async url => {
	try {
		const res = await axios({
			method: "get",
			url,
			responseType: "stream"
		})

		if (!res.headers["content-type"].includes("image/"))
			throw new Error("url provided is not an image")

		return res.data
	} catch (error) {
		throw error
	}
}

export const resize = (width, height) => {
	const sharpObj = sharp()
	sharpObj.resize(width, height)
	return sharpObj
}
