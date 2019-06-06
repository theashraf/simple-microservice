import request from "supertest"
import app from "../../../src/app"

describe("/auth", () => {
	describe("POST /login", () => {
		it("Should return a valid auth token", async () => {
			const res = await request(app)
				.post("/api/auth/login")
				.send({
					username: "admin",
					password: "admin"
				})
			expect(res.status).toBe(200)
			expect(res.body).toHaveProperty("token")
			expect(typeof res.body.token).toBe("string")
		})
		it("Should return username is required error", async () => {
			const res = await request(app)
				.post("/api/auth/login")
				.send({
					password: "admin"
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"username" is required',
				status: 400
			})
		})
		it("Should return password is required error", async () => {
			const res = await request(app)
				.post("/api/auth/login")
				.send({
					username: "admin"
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"password" is required',
				status: 400
			})
		})
		it("Should return username must be string error", async () => {
			const res = await request(app)
				.post("/api/auth/login")
				.send({
					username: 1234
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"username" must be a string',
				status: 400
			})
		})
		it("Should return password must be string error", async () => {
			const res = await request(app)
				.post("/api/auth/login")
				.send({
					username: "admin",
					password: 1234
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"password" must be a string',
				status: 400
			})
		})
	})
})
