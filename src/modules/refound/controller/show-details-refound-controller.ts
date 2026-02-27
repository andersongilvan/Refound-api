import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import type { FindRefoundByIdUseCase } from '../userCase/find-refound-by-id';

export class ShowDetailsRefoundController {
	constructor(private findRefoundByIdUseCse: FindRefoundByIdUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const paramsSchema = z.object({
				refoundId: z.string().nonempty('O id do reembolso é obrigatório.'),
			});
			const { refoundId } = paramsSchema.parse(request.params);
			const userId = request.user.id;

			const result = await this.findRefoundByIdUseCse.execute({ refoundId, userId });

			return response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};
}
