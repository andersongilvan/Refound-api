import crypto from 'node:crypto';
import path from 'node:path';
import multer from 'multer';

const TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, 'uploads');

const MAX_SIZE = 3; // 3MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const MULTER = {
	storage: multer.diskStorage({
		destination: TEMP_FOLDER,
		filename(_request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex');
			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		},
	}),
};

export default { TEMP_FOLDER, UPLOADS_FOLDER, MULTER, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_SIZE };
