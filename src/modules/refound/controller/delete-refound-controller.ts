import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import type { DeleteRefoundUseCase } from '../userCase/delete-refound-usecase';

export class DeleteRefoundController {
	constructor(private deleteRefoundUseCase: DeleteRefoundUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const paramsSchema = z.object({
				refoundId: z.string().nonempty('O id do reembolso é obrigatório.'),
			});

			const { refoundId } = paramsSchema.parse(request.params);

			const userId = request.user.id;

			await this.deleteRefoundUseCase.execute({ userId, refoundId });

			return response.status(204).send();
		} catch (error) {
			next(error);
		}
	};
}
