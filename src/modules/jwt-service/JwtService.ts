import type { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { env } from '@/env';

export class JwtServvice {
	generateToken = (user: User) => {
		const token = sign({ role: user.role }, env.JWT_SECRET, {
			subject: user.id,
			expiresIn: '1d',
		});

		return token;
	};
}
