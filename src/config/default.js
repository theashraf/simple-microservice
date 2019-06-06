const config = {
	logLevel: process.env.NODE_ENV === "test" ? "silent" : "info",
	port: 3000,
	env: process.env.NODE_ENV || "development",
	jwt: {
		secret: "secret",
		expiresIn: "12h"
	}
}

export default config
