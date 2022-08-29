import Router from 'express';

import BasketController from '../controllers/basketController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const basketRouter = new Router();

// brandRouter.post('/', checkRole('ADMIN'), BasketController.add);

// brandRouter.get('/', BasketController.getAll);
// brandRouter.get('/:id', BasketController.getOne);

// brandRouter.patch('/:id', checkRole('ADMIN'), BasketController.edit);

// brandRouter.delete('/:id', checkRole('ADMIN'), BasketController.remove);

export default basketRouter;