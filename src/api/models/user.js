const fakeUsers = [
	{ id: "1234", username: "admin", password: "admin" },
	{ id: "12345", username: "john", password: "1234" }
]

export const findById = id => fakeUsers.find(user => user.id === id)

export const findByUsernameAndPass = (username, password) =>
	fakeUsers.find(
		user => user.username === username && user.password === password
	)
