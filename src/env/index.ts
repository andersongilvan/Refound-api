import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number(),
	JWT_SECRET: z.coerce.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error('Falha nas variaveis de ambiência.', _env.error.formErrors);
	throw new Error('Falha nas variaveis de ambiência.');
}

export const env = _env.data;
