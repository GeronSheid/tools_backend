import express from 'express';
import { userController } from './user.controler';
import { createUserSchema, updateUserSchema } from './user.schema';
import { validateBody } from '../../middlewares/validateBody';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', validateBody(createUserSchema), userController.createUser);
userRouter.put('/:id',  userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;