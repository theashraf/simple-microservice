# simple microservice

simple stateless microservice in Nodejs, with three major functionalities -

- Authentication
- JSON patching
- Image Thumbnail Generation

## Getting Started

```bash
  npm install
  npm start
```

## Usage

### Login with a User [POST /api/auth/login]

- for the available user accounts for testing , check the [user](./src/api/models/user.js) model
- Request: Login with credentials to recieve a JSON web token

  - Headers

    - Content-type: application/json

  - Body
    ```json
    {
    	"username": "admin",
    	"password": "admin"
    }
    ```

- Response: 200 (application/json)

  - Body
    ```json
    {
    	"token": "$authToken"
    }
    ```

### JSON patching [POST /api/jsonpatch/apply]

- Request: Apply the json patch to the json object, and return the resulting json object.

  - Headers

    - authorization: Bearer \$authToken
    - Content-type: application/json

  - Body
    ```json
    {
    	"originalDoc": {
    		"baz": "qux",
    		"foo": "bar"
    	},
    	"patch": [
    		{ "op": "replace", "path": "/baz", "value": "boo" },
    		{ "op": "add", "path": "/hello", "value": ["world"] },
    		{ "op": "remove", "path": "/foo" }
    	]
    }
    ```

- Response: 200 (application/json)

  - Body
    ```json
    {
    	"baz": "boo",
    	"hello": ["world"]
    }
    ```

### Image Thumbnail Generation [POST /api/thumbnail/create]

- Request: Apply the json patch to the json object, and return the resulting json object.

  - Headers
    - authorization: Bearer \$authToken
    - content-type: application/json
  - Body
    ```json
    {
    	"imgUrl": ""
    }
    ```

* Response: 200 (image/jpg)

  - Body
    ```
      <buffer>
    ```

## development

```bash
npm run dev // start server is development mode
npm test -- --watchAll // run tests
```

## Contribution

1. Fork the project
2. Create your feature branch (git checkout -b feature/fooBar), or hotfix branch (git checkout -b hotfix/fooBar)
3. Commit your changes (npm run commit)
4. Push to the feature branch (git push origin feature/fooBar), or hotfix branch (git push origin hotfix/fooBar)
5. Create a new Pull Request
6. make sure all tests passes

## License

This project is licensed under the MIT License, See [LICENSE](LICENSE) for more information
