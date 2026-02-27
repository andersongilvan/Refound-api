import type { Category } from '@prisma/client';
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';
import type { UserRepository } from '@/modules/user/repository/UserRepository';
import type { DiskStorage } from '@/utils/disk-storage';
import type { RefoundRepository } from '../repository/refaound-repository';

interface Request {
	name: string;
	amount: number;
	category: Category;
	filename: string;
	userId: string;
}

interface Response {
	id: string;
	name: string;
	amount: number;
	category: Category;
	filename: string;
	user: {
		name: string;
		email: string;
		id: string;
	};
}

export class CreateRefaoundUseCase {
	constructor(
		private refaoundRepository: RefoundRepository,
		private userRepository: UserRepository,
		private discStorage: DiskStorage,
	) {}

	async execute({ name, amount, category, filename, userId }: Request): Promise<Response> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('Usuário não encontrado.');
		}

		try {
			const savedFileName = await this.discStorage.saveFile(filename);

			const refaound = await this.refaoundRepository.create({
				name,
				amount,
				category,
				filename: savedFileName,
				user: { connect: { id: userId } },
			});

			return {
				id: refaound.id,
				name: refaound.name,
				amount: refaound.amount.toNumber(),
				category: refaound.category,
				filename: refaound.filename,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			};
		} catch (error) {
			// 3️⃣ Se banco falhar depois do saveFile,
			// removemos o arquivo da pasta final
			await this.discStorage.deleteFile(filename, 'upload');
			throw error;
		}
	}
}
