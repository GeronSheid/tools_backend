import express from 'express';
import { userController } from './user.controler';
import { createUserSchema, updateUserSchema } from './user.schema';
import { validateBody } from '../../middlewares/validateBody';
import { authController } from '../auth/auth.controller';
import { authMiddleware } from '../security/auth.middleware';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, userController.getAllUsers);
userRouter.get('/:id', authMiddleware, userController.getUser);
userRouter.post('/', validateBody(createUserSchema), authController.register);
userRouter.put('/:id',  userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;