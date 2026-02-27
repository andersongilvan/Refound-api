import { JwtServvice } from '@/modules/jwt-service/JwtService';
import { UserRepositoryImpl } from '../../repository/UserRepositoryImpl';
import { AuthUserUseCase } from '../../userCase/AuthUserUseCase';
import { AuthUserController } from '../AuthUserController';

const repository = new UserRepositoryImpl();

const jwtService = new JwtServvice();

const usecase = new AuthUserUseCase(repository, jwtService);

const authUserCpntroller = new AuthUserController(usecase);

export { authUserCpntroller };
