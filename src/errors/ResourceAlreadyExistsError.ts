export class ResourceAlreadyExistsError extends Error {
	constructor(
		readonly message: string,
		readonly statusCode: number = 409,
	) {
		super(message);
	}
}
