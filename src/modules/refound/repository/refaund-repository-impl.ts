import type { Prisma, Refounds } from '@prisma/client';
import { prismaClient } from '@/prisma';
import type { RefoundRepository } from './refaound-repository';

export class RefaundRepositoryImpl implements RefoundRepository {
	// user mothods <-->
	async showDetails(refoundId: string): Promise<Refounds | null> {
		return await prismaClient.refounds.findFirst({
			where: { id: refoundId },
		});
	}

	async findAllByUser(userId: string, skip: number, take: number): Promise<{ data: Refounds[]; total: number }> {
		const [data, totalItems] = await prismaClient.$transaction([
			prismaClient.refounds.findMany({
				take,
				skip,
				where: { userId },
				orderBy: { createdAt: 'desc' },
			}),

			prismaClient.refounds.count({ where: { userId } }),
		]);

		return {
			data,
			total: totalItems,
		};
	}

	// <-->

	// manager methds <-->
	async findAll(name: string, skip: number, take: number): Promise<{ data: Refounds[]; total: number }> {
		const where: Prisma.RefoundsWhereInput = {
			user: {
				name: {
					contains: name.trim(),
					mode: 'insensitive',
				},
			},
		};

		const [data, totalItems] = await prismaClient.$transaction([
			prismaClient.refounds.findMany({
				take,
				skip,
				where,
				orderBy: { createdAt: 'desc' },
				include: { user: true },
			}),

			prismaClient.refounds.count({ where }),
		]);

		return {
			data,
			total: totalItems,
		};
	}
	async create(data: Prisma.RefoundsCreateInput): Promise<Refounds> {
		return await prismaClient.refounds.create({ data });
	}

	async delete(refoundId: string): Promise<void> {
		await prismaClient.refounds.delete({ where: { id: refoundId } });
	}

	// <-->
}
