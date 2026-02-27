export class AuthError extends Error {
	constructor(
		readonly message: string,
		readonly statusCode: number = 401,
	) {
		super(message);
	}
}
