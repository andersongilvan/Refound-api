import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';
import type { DiskStorage } from '@/utils/disk-storage';
import type { RefoundRepository } from '../repository/refaound-repository';

interface Request {
	userId: string;
	refoundId: string;
}

export class DeleteRefoundUseCase {
	constructor(
		private refoundRepository: RefoundRepository,
		private diskStorage: DiskStorage,
	) {}

	async execute({ userId, refoundId }: Request) {
		const refaound = await this.refoundRepository.showDetails(refoundId, userId);

		if (!refaound) {
			throw new ResourceNotFoundError('Reembolso não encontrado.');
		}

		await this.diskStorage.deleteFile(refaound.filename, 'upload');

		await this.refoundRepository.delete(refoundId);
	}
}
