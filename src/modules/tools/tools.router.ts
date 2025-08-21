import express from 'express';
import { toolsController } from './tools.controller';
import { validateBody } from '../../middlewares/validateBody';
import { CreateToolSchema, UpdateToolSchema } from './tools.schema';
import { authMiddleware } from '../security/auth.middleware';

const toolsRouter = express.Router();

toolsRouter.get("/", toolsController.getAllTools);
toolsRouter.get("/:type", toolsController.getTypeTools);
toolsRouter.get("/tool/:id", toolsController.getToolById);
toolsRouter.post("/", authMiddleware, validateBody(CreateToolSchema), toolsController.createTool);
toolsRouter.put("/tool/:id", authMiddleware, validateBody(UpdateToolSchema), toolsController.updateTool);
toolsRouter.delete("/tool/:id", authMiddleware, toolsController.deleteTool);

export default toolsRouter;