import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import type { FindAllRefoundsByUserUseCase } from '../userCase/find-all-refaounds-by-user-usercase';

export class ShowRefoundsByUserController {
	constructor(private findAllRefoundsByUserUseCase: FindAllRefoundsByUserUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const userId = request.user.id;

			const querySchema = z.object({
				page: z.coerce.number().int().min(1).default(1),
				perPage: z.coerce.number().int().min(1).default(10),
			});

			const { page, perPage } = querySchema.parse(request.params);

			const result = await this.findAllRefoundsByUserUseCase.execute({ userId, page, perPage });

			return response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};
}
