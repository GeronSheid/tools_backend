import userRouter from './user.router';

import { userController } from './user.controler';
import { userRepository } from './user.repository';
import * as userSchema from './user.schema';
import { userService } from './user.service';

export default userRouter;

export const UserModule = {
  controller: userController,
  repository: userRepository,
  schema: userSchema,
  service: userService
}

