import request from "supertest"
import app from "../../../src/app"

describe("/api/thumbnail", () => {
	let authToken = ""
	beforeAll(async () => {
		const res = await request(app)
			.post("/api/auth/login")
			.send({ username: "admin", password: "admin" })
		authToken = res.body.token
	})

	describe("GET /api/thumbnail/create", () => {
		it("Should return unauthorized error", async () => {
			const res = await request(app).post("/api/thumbnail/create")

			expect(res.status).toBe(401)
			expect(res.body).toMatchObject({ error: "unauthorized", status: 401 })
		})

		it("Should return imgUrl is required error", async () => {
			const res = await request(app)
				.post("/api/thumbnail/create")
				.set("authorization", "Bearer " + authToken)

			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"imgUrl" is required',
				status: 400
			})
		})

		it("Should return imgUrl must be a string error", async () => {
			const res = await request(app)
				.post("/api/thumbnail/create")
				.set("authorization", "Bearer " + authToken)
				.send({ imgUrl: 123 })

			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"imgUrl" must be a string',
				status: 400
			})
		})

		it("Should return imgUrl must be a valid uri error", async () => {
			const res = await request(app)
				.post("/api/thumbnail/create")
				.set("authorization", "Bearer " + authToken)
				.send({ imgUrl: "img url" })

			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"imgUrl" must be a valid uri',
				status: 400
			})
		})

		it("Should create a thumbnail", async () => {
			const res = await request(app)
				.post("/api/thumbnail/create")
				.set("authorization", "Bearer " + authToken)
				.send({ imgUrl: "https://via.placeholder.com/150" })

			expect(res.status).toBe(200)
			expect(res.header["content-type"]).toBe("image/jpeg")
		})

		it("Should create a png thumbnail", async () => {
			const res = await request(app)
				.post("/api/thumbnail/create")
				.set("authorization", "Bearer " + authToken)
				.send({ imgUrl: "https://via.placeholder.com/150" })

			expect(res.status).toBe(200)
			expect(res.header["content-type"]).toBe("image/jpeg")
		})
	})
})
