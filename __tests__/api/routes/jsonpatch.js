import request from "supertest"
import app from "../../../src/app"

describe("/api/jsonpatch", () => {
	let authToken = ""
	beforeAll(async () => {
		const res = await request(app)
			.post("/api/auth/login")
			.send({ username: "admin", password: "admin" })
		authToken = res.body.token
	})

	describe("POST /apply", () => {
		it("Should return unauthorized error", async () => {
			const res = await request(app).post("/api/jsonpatch/apply")

			expect(res.status).toBe(401)
			expect(res.body).toMatchObject({ error: "unauthorized", status: 401 })
		})

		it("Should return originalDoc is required error", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({})

			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"originalDoc" is required',
				status: 400
			})
		})

		it("Should return originalDoc must be an object", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({ originalDoc: 124 })

			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"originalDoc" must be an object',
				status: 400
			})
		})

		it("Should return patch is required error", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({
					originalDoc: {
						baz: "qux",
						foo: "bar"
					}
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"patch" is required',
				status: 400
			})
		})

		it("Should return patch must be an array", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({
					originalDoc: {
						baz: "qux",
						foo: "bar"
					},
					patch: 123
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: '"patch" must be an array',
				status: 400
			})
		})

		it("Should return Operation missing! error", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({
					originalDoc: { baz: "qux" },
					patch: [{}]
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: "Operation missing!",
				status: 400
			})
		})

		it("Should return replace must have key value error", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({
					originalDoc: { baz: "qux" },
					patch: [{ op: "replace", path: "/baz" }]
				})
			expect(res.status).toBe(400)
			expect(res.body).toMatchObject({
				error: "replace must have key value",
				status: 400
			})
		})

		it("Should return a successfully patched document", async () => {
			const res = await request(app)
				.post("/api/jsonpatch/apply")
				.set("authorization", "Bearer " + authToken)
				.send({
					originalDoc: {
						baz: "qux",
						foo: "bar"
					},
					patch: [
						{ op: "replace", path: "/baz", value: "boo" },
						{ op: "add", path: "/hello", value: ["world"] },
						{ op: "remove", path: "/foo" }
					]
				})
			expect(res.status).toBe(200)
			expect(res.body).toMatchObject({
				baz: "boo",
				hello: ["world"]
			})
		})
	})
})
