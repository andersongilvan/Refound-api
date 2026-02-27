import type { NextFunction, Request, Response } from 'express';
import z, { string } from 'zod';
import type { FindAllRefoundsUseCase } from '../userCase/find-all-refaounds';

export class IndexController {
	constructor(private findAllRefoundsUseCase: FindAllRefoundsUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const querySchema = z.object({
				name: string().optional().default(''),
				page: z.coerce.number().int().min(1).default(1),
				perPage: z.coerce.number().int().min(1).default(10),
			});

			const { name, page, perPage } = querySchema.parse(request.query);

			const result = await this.findAllRefoundsUseCase.execute({ name, page, perPage });

			return response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};
}
