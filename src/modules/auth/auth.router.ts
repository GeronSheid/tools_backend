import express from "express";
import { validateBody } from "../../middlewares/validateBody";
import { CreateUserSchema } from "../user/user.schema";
import { authController } from "./auth.controller";
import { LoginSchema } from "./auth.schema";

const authRouter = express.Router();

authRouter.post('/', validateBody(CreateUserSchema), authController.register);
authRouter.post('/login', validateBody(LoginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);


export default authRouter;