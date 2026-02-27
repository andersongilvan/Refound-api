import { UserRepositoryImpl } from '@/modules/user/repository/UserRepositoryImpl';
import { RefaundRepositoryImpl } from '../../repository/refaund-repository-impl';
import { FindAllRefoundsByUserUseCase } from '../../userCase/find-all-refaounds-by-user-usercase';
import { ShowRefoundsByUserController } from '../show-controller';

const userRepository = new UserRepositoryImpl();

const refoundRepository = new RefaundRepositoryImpl();

const findAllRefoundsByUserUseCase = new FindAllRefoundsByUserUseCase(refoundRepository, userRepository);

const showRefoundsByUserController = new ShowRefoundsByUserController(findAllRefoundsByUserUseCase);

export { showRefoundsByUserController };
