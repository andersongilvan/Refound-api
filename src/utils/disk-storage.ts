import fs from 'node:fs';
import path from 'node:path';

import uploadsConfig from '@/configs/upload';
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';

export class DiskStorage {
	async saveFile(file: string) {
		// Monta o caminho absoluto do arquivo na pasta temporária (ex: /tmp/foto.png)
		const tmpPath = path.resolve(uploadsConfig.TEMP_FOLDER, file);

		// Monta o caminho absoluto do destino final (ex: /uploads/foto.png)
		const destPath = path.resolve(uploadsConfig.UPLOADS_FOLDER, file);

		// Garante que a pasta de uploads exista
		// { recursive: true } evita erro caso a pasta já exista
		await fs.promises.mkdir(uploadsConfig.UPLOADS_FOLDER, { recursive: true });

		try {
			// Move o arquivo da pasta temporária para a pasta definitiva
			// Se o arquivo não existir, essa linha lança erro
			await fs.promises.rename(tmpPath, destPath);
		} catch {
			// Caso o arquivo não seja encontrado, lança um erro controlado da aplicação
			throw new ResourceNotFoundError(`Arquivo não encontrado: ${tmpPath}`);
		}

		// Retorna o nome do arquivo (geralmente para salvar no banco ou retornar na API)
		return file;
	}

	async deleteFile(file: string, type: 'tmp' | 'upload') {
		// Define qual pasta será usada com base no tipo informado
		const baseFolder = type === 'tmp' ? uploadsConfig.TEMP_FOLDER : uploadsConfig.UPLOADS_FOLDER;

		// Monta o caminho absoluto do arquivo
		const filePath = path.resolve(baseFolder, file);

		try {
			// Tenta remover o arquivo
			// Se ele não existir, o Node lançará erro
			await fs.promises.unlink(filePath);
		} catch (error: any) {
			// Se o erro for porque o arquivo não existe (ENOENT),
			// simplesmente ignoramos
			if (error.code === 'ENOENT') {
				return;
			}

			// Se for qualquer outro erro, lançamos novamente
			throw error;
		}
	}
}
