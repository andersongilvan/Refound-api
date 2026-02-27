import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import type { AuthUserUseCase } from '../userCase/AuthUserUseCase';

export class AuthUserController {
	constructor(private authUserService: AuthUserUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bodySchema = z.object({
				email: z.string(),
				password: z.string(),
			});

			const { email, password } = bodySchema.parse(request.body);

			const result = await this.authUserService.execute({ email, password });

			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};
}
