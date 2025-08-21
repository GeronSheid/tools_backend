import authRouter from "./auth.router";

import { authController } from "./auth.controller";
import * as authSchema from "./auth.schema";
import { authService } from "./auth.service";

export default authRouter;

export const AuthModule = {
  controller: authController,
  schema: authSchema,
  service: authService
}