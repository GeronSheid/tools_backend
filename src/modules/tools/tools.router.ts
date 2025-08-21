import express from 'express';
import { toolsController } from './tools.controller';
import { validateBody } from '../../middlewares/validateBody';
import { CreateToolSchema, UpdateToolSchema } from './tools.schema';

const toolsRouter = express.Router();

toolsRouter.get("/", toolsController.getAllTools);
toolsRouter.get("/:type", toolsController.getTypeTools);
toolsRouter.get("/tool/:id", toolsController.getToolById);
toolsRouter.post("/", validateBody(CreateToolSchema), toolsController.createTool);
toolsRouter.put("/tool/:id", validateBody(UpdateToolSchema), toolsController.updateTool);
toolsRouter.delete("/tool/:id", toolsController.deleteTool);

export default toolsRouter;