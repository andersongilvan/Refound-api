import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AuthError } from '@/errors/AuthError';
import { ResourceAlreadyExistsError } from '@/errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';

export function errorHandler(error: Error, _request: Request, response: Response, _next: NextFunction) {
	if (error instanceof ZodError) {
		return response.status(400).json({ validationError: error.format() });
	}

	if (error instanceof ResourceNotFoundError) {
		return response.status(error.statusCode).json({ message: error.message });
	}

	if (error instanceof ResourceAlreadyExistsError) {
		return response.status(error.statusCode).json({ message: error.message });
	}

	if (error instanceof AuthError) {
		return response.status(error.statusCode).json({ message: error.message });
	}

	return response.status(500).json({ message: 'Falha no servidor, tente mais tarde.' });
}
