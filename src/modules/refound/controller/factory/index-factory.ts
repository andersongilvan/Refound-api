import { RefaundRepositoryImpl } from '../../repository/refaund-repository-impl';
import { FindAllRefoundsUseCase } from '../../userCase/find-all-refaounds';
import { IndexController } from '../Index-controller';

const refaundRepository = new RefaundRepositoryImpl();
const usecase = new FindAllRefoundsUseCase(refaundRepository);

const indexController = new IndexController(usecase);

export { indexController };
