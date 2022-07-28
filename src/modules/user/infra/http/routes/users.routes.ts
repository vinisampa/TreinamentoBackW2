import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.put('/:id', ensureAuthentication, usersController.update);
usersRouter.delete('/:id', ensureAuthentication, usersController.delete);
usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);

export default usersRouter;
