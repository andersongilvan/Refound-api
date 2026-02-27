import { UserRepositoryImpl } from '@/modules/user/repository/UserRepositoryImpl';
import { DiskStorage } from '@/utils/disk-storage';
import { RefaundRepositoryImpl } from '../../repository/refaund-repository-impl';
import { CreateRefaoundUseCase } from '../../userCase/create-refaund-usecase';
import { CreateRefoundController } from '../create-refaound-controller';

const refaundRepository = new RefaundRepositoryImpl();
const userRepository = new UserRepositoryImpl();
const diskStorage = new DiskStorage();
const createRefaundUseCase = new CreateRefaoundUseCase(refaundRepository, userRepository, diskStorage);

const createRefoundController = new CreateRefoundController(createRefaundUseCase);

export { createRefoundController };
