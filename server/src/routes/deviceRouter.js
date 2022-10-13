import Router from 'express';

import DeviceController from '../controllers/deviceController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const deviceRouter = new Router();

deviceRouter.post('/', checkRole('ADMIN'), DeviceController.create);

deviceRouter.get('/', DeviceController.getAll);
deviceRouter.get('/filter/:id', DeviceController.getFiltered);

deviceRouter.get('/:id', DeviceController.getOne);

deviceRouter.patch('/:id', checkRole('ADMIN'), DeviceController.edit);

deviceRouter.delete('/:id', checkRole('ADMIN'), DeviceController.remove);

export default deviceRouter;
