import jsonpatch from "jsonpatch"

const applyPatch = async (req, res, next) => {
	const { originalDoc, patch } = req.body
	let patchedDoc

	try {
		patchedDoc = jsonpatch.apply_patch(originalDoc, patch)
	} catch (err) {
		err.status = 400
		next(err)
		return
	}

	res.status(200).json(patchedDoc)
}

export default { applyPatch }
