interface Request {
	refoundId: string;
	userId: string;
}

import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';
import type { RefoundRepository } from '../repository/refaound-repository';

export class FindRefoundByIdUseCase {
	constructor(private refoundRepository: RefoundRepository) {}

	async execute({ refoundId, userId }: Request) {
		const refound = await this.refoundRepository.showDetails(refoundId, userId);

		if (!refound) {
			throw new ResourceNotFoundError('Reembolso não encontrado.');
		}

		return refound;
	}
}
