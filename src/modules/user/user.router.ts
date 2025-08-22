import express from 'express';
import { userController } from './user.controler';
import { CreateUserSchema, UpdateUserSchema } from './user.schema';
import { validateBody } from '../../middlewares/validateBody';
import { authMiddleware } from '../security/auth.middleware';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, userController.getAllUsers);
userRouter.get('/:id', authMiddleware, userController.getUser);
userRouter.post('/', authMiddleware, validateBody(CreateUserSchema), userController.createUser);
userRouter.put('/:id', authMiddleware, validateBody(UpdateUserSchema),  userController.updateUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);

export default userRouter;