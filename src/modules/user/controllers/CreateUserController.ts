import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import type { CreateUserUseCase } from '../userCase/CreateUserUseCase';

export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bodySchema = z.object({
				name: z.string().min(6),
				email: z.string().email(),
				password: z.string().min(6),
			});

			const { name, email, password } = bodySchema.parse(request.body);

			const result = await this.createUserUseCase.execute({ name, email, password });

			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};
}
