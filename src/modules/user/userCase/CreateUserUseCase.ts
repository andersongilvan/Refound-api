import { hash } from 'bcryptjs';
import { ResourceAlreadyExistsError } from '@/errors/ResourceAlreadyExistsError';
import type { UserRepository } from '../repository/UserRepository';

interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
}

interface CreateUserResponse {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
}

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ name, email, password }: CreateUserRequest): Promise<CreateUserResponse> {
		const emailIsduplicated = await this.userRepository.findByEmail(email);

		if (emailIsduplicated) {
			throw new ResourceAlreadyExistsError('E-mail já cadastrado. Por favor use outro.');
		}

		const hashPassword = await hash(password, 6);

		password = hashPassword;

		const newUser = await this.userRepository.create({
			name,
			email,
			password,
		});

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			createdAt: newUser.createdAt,
		};
	}
}
