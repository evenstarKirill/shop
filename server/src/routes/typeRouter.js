import Router from 'express';

import TypeController from '../controllers/typeController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const typeRouter = new Router();

typeRouter.post('/', checkRole('ADMIN'), TypeController.create);

typeRouter.get('/', TypeController.getAll);
typeRouter.get('/:id', TypeController.getOne);

typeRouter.patch('/:id', checkRole('ADMIN'), TypeController.edit);

typeRouter.delete('/:id', checkRole('ADMIN'), TypeController.remove);

export default typeRouter;
