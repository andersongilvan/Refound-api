import { UserRepositoryImpl } from '../../repository/UserRepositoryImpl';
import { CreateUserUseCase } from '../../userCase/CreateUserUseCase';
import { CreateUserController } from '../CreateUserController';

const createUserController = new CreateUserController(new CreateUserUseCase(new UserRepositoryImpl()));

export { createUserController };
