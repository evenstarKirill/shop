import Router from 'express';

import BrandController from '../controllers/brandController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const brandRouter = new Router();

brandRouter.post('/', checkRole('ADMIN'), BrandController.create);

brandRouter.get('/', BrandController.getAll);
brandRouter.get('/:id', BrandController.getOne);

brandRouter.patch('/:id', checkRole('ADMIN'), BrandController.edit);

brandRouter.delete('/:id', checkRole('ADMIN'), BrandController.remove);

export default brandRouter;
