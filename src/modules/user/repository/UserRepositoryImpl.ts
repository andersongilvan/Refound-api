import type { Prisma, User } from '@prisma/client';
import { prismaClient } from '@/prisma';
import type { UserRepository } from './UserRepository';

export class UserRepositoryImpl implements UserRepository {
	async findById(userId: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({ where: { id: userId } });

		if (!user) {
			return null;
		}

		return user;
	}
	async create(data: Prisma.UserCreateInput): Promise<User> {
		return await prismaClient.user.create({ data });
	}
	async findByEmail(email: string): Promise<User | null> {
		return await prismaClient.user.findUnique({ where: { email } });
	}
}
