import { Category } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import uploadConfig from '@/configs/upload';
import type { CreateRefaoundUseCase } from '../userCase/create-refaund-usecase';

export class CreateRefoundController {
	constructor(private createRefoundUseCase: CreateRefaoundUseCase) {}

	handler = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const fileSchema = z.object({
				filename: z.string().min(1, 'O npme do arquivo é obrigatório.'),
				mimetype: z
					.string()
					.refine(
						(type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
						`Formato de arquivo inválido. Formatos permitidos: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`,
					),
				size: z
					.number()
					.refine(
						(size) => size <= uploadConfig.MAX_FILE_SIZE,
						`Arquivo exede o tamanho máximo de ${uploadConfig.MAX_SIZE}MB`,
					),
			});

			const bodySchema = z.object({
				name: z.string().min(6, 'O nome é obrigatório.'),
				amount: z.coerce.number().nonnegative('O valoe é obrigatório.'),
				category: z.nativeEnum(Category),
			});

			const { filename, mimetype: _miiType, size: _size } = fileSchema.parse(request.file);

			const { name, amount, category } = bodySchema.parse(request.body);

			const userId = request.user.id;

			const result = await this.createRefoundUseCase.execute({ name, amount, category, filename, userId });

			return response.status(201).json(result);
		} catch (error) {
			next(error);
		}
	};
}
