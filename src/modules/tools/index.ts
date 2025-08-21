import toolsRouter from "./tools.router";

import * as toolsSchema from "./tools.schema";
import { toolsRepository } from "./tools.repository";
import { toolsController } from "./tools.controller";

export default toolsRouter;

export const ToolsModule = {
  controller: toolsController,
  repository: toolsRepository,
  schema: toolsSchema
}