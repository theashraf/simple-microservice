import envalid, { str, port } from "envalid"

export default envalid.cleanEnv(process.env, {
	PORT: port({ default: 3000 }),
	NODE_ENV: str({ default: "development" }),
	LOG_LEVEL: str({
		choices: ["silent", "info", "error", "debug"],
		default: "info"
	}),
	JWT_SECRET: str({ devDefault: "secret" }),
	JWT_EXPRIRES_IN: str({ devDefault: "30d" })
})
