interface Request {
	refoundId: string;
}

import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';
import type { RefoundRepository } from '../repository/refaound-repository';

export class FindRefoundByIdUseCase {
	constructor(private refoundRepository: RefoundRepository) {}

	async execute({ refoundId }: Request) {
		const refound = await this.refoundRepository.showDetails(refoundId);

		if (!refound) {
			throw new ResourceNotFoundError('Reembolso não encontrado.');
		}

		return refound;
	}
}
