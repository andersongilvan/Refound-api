import { RefaundRepositoryImpl } from '../../repository/refaund-repository-impl';
import { FindRefoundByIdUseCase } from '../../userCase/find-refound-by-id';
import { ShowDetailsRefoundController } from '../show-details-refound-controller';

const refoundRepository = new RefaundRepositoryImpl();

const findRefoundByIdUseCase = new FindRefoundByIdUseCase(refoundRepository);

const showDetailsRefoundController = new ShowDetailsRefoundController(findRefoundByIdUseCase);

export { showDetailsRefoundController };
