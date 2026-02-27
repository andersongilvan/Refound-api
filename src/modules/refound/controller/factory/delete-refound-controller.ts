import { DiskStorage } from '@/utils/disk-storage';
import { RefaundRepositoryImpl } from '../../repository/refaund-repository-impl';
import { DeleteRefoundUseCase } from '../../userCase/delete-refound-usecase';
import { DeleteRefoundController } from '../delete-refound-controller';

const refoundRepository = new RefaundRepositoryImpl();

const diskStorage = new DiskStorage();

const deleteRefoundUseCase = new DeleteRefoundUseCase(refoundRepository, diskStorage);

const deleteRefoundController = new DeleteRefoundController(deleteRefoundUseCase);

export { deleteRefoundController };
