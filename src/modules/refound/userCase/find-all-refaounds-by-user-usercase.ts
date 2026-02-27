import type { Refounds } from '@prisma/client';
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';
import type { UserRepository } from '@/modules/user/repository/UserRepository';
import type { RefoundRepository } from '../repository/refaound-repository';

interface Request {
	userId: string;
	page: number;
	perPage: number;
}

interface Response<T> {
	items: T[];
	perPage: number;
	page: number;
	totalItems: number;
	totalPages: number;
}

export class FindAllRefoundsByUserUseCase {
	constructor(
		private refoundRepository: RefoundRepository,
		private userRepository: UserRepository,
	) {}

	async execute({ userId, page, perPage }: Request): Promise<Response<Refounds>> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('Usuário não encontrado.');
		}

		const skip = (page - 1) * perPage;

		const { data, total } = await this.refoundRepository.findAllByUser(userId, skip, perPage);

		return {
			items: data,
			perPage,
			page,
			totalItems: total,
			totalPages: Math.ceil(total / perPage),
		};
	}
}
