import userRouter from './user.router';
import * as userController from './user.controler';
import { userService } from './user.service';

export default {
  userRouter,
  controller: userController,
  userService
};