import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '@/env';
import { AuthError } from '@/errors/AuthError';

interface TokenPayload {
	sub: string;
	role: string;
}

export function ensureAuth(request: Request, _response: Response, next: NextFunction) {
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new AuthError('JWT Token não encontrado.');
		}

		const [, token] = authHeader.split(' ');

		const { role, sub: userId } = verify(token, env.JWT_SECRET) as TokenPayload;

		request.user = {
			id: userId,
			role,
		};

		return next();
	} catch (error) {
		console.error(error);
		throw new AuthError('JWT Token inválido.');
	}
}
