import api from "../api"

export default app => {
	app.use("/api/auth", api.auth)
	app.use("/api/jsonpatch", api.jsonpatch)
	app.use("/api/thumbnail", api.thumbnail)
}
