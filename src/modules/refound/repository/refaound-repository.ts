import type { Prisma, Refounds } from '@prisma/client';

export interface RefoundRepository {
	create(data: Prisma.RefoundsCreateInput): Promise<Refounds>;
	findAll(name: string, skip: number, take: number): Promise<{ data: Refounds[]; total: number }>;
	findAllByUser(userId: string, skip: number, take: number): Promise<{ data: Refounds[]; total: number }>;
	delete(refoundId: string): Promise<void>;
	showDetails(refoundId: string): Promise<Refounds | null>;
}
