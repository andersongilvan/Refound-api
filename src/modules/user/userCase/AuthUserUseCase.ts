import { compare } from 'bcryptjs';
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError';
import type { JwtServvice } from '@/modules/jwt-service/JwtService';
import type { UserRepository } from '../repository/UserRepository';

interface Request {
	email: string;
	password: string;
}

interface Response {
	token: string;
	user: {
		id: string;
		name: string;
		role: string;
	};
}

export class AuthUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtServvice,
	) {}

	execute = async ({ email, password }: Request): Promise<Response> => {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new ResourceNotFoundError('E-mail ou senha inválida');
		}

		const passwordIsMatches = await compare(password, user.password);
		if (!passwordIsMatches) {
			throw new ResourceNotFoundError('E-mail ou senha inválida');
		}

		const token = this.jwtService.generateToken(user);

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				role: user.role,
			},
		};
	};
}
