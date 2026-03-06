import type { NextFunction, Request, Response } from 'express';
import { AuthError } from '@/errors/AuthError';

export function verifyUser(role: string[]) {
	return (request: Request, _response: Response, next: NextFunction) => {

		if (!request.user || !role.includes(request.user.role)) {

			
			throw new AuthError(`Não autorizado. ${request.user.role}`);
		}

		return next();
	};
}
