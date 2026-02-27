import type { Refounds } from '@prisma/client';
import type { RefoundRepository } from '../repository/refaound-repository';

interface Request {
	name: string;
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

export class FindAllRefoundsUseCase {
	constructor(private refoundRepository: RefoundRepository) {}

	async execute({ name, page, perPage }: Request): Promise<Response<Refounds>> {
		const skip = (page - 1) * perPage;

		const { data, total } = await this.refoundRepository.findAll(name, skip, perPage);

		return {
			items: data,
			perPage,
			page,
			totalItems: total,
			totalPages: Math.ceil(total / perPage),
		};
	}
}
