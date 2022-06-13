import CustomError from "./CustomError.mjs";

const Errors = {
	login: () => {
		throw new CustomError({
			statusCode: 401,
			message: "login",
			description: "email or password incorrect",
			fields: []
		})
	},
	notExists: (fields) => {
		throw new CustomError({
			statusCode: 404,
			message: "notExists",
			description: "item not exists",
			fields: fields
		})
	},
	unexpectedServerError: () => {
		throw new CustomError({
			statusCode: 500,
			message: "unexpectedServerError",
			description: "unexpected server error occurred",
			fields: []
		})
	},
	alreadyExists: (fields) => {
		throw new CustomError({
			statusCode: 400,
			message: "alreadyExists",
			description: "item already exists",
			fields: fields
		})
	},
	notAuthenticated: () => {
		throw new CustomError({
			statusCode: 401,
			message: "notAuthenticated",
			description: "you are not authenticated",
			fields: []
		})
	},
}

export default Errors