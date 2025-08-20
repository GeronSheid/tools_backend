import { ToolType } from '../../generated/prisma';
import {prisma} from '../prisma/prisma.service';
import { CreateTool, Tool, UpdateTool } from './tools.schema';
// import { Tool } from '../../generated/prisma';
export const userRepository = {
  async findAll(): Promise<Tool[]> {
    return await prisma.tool.findMany();
  },

  async findToolById(id: number): Promise<Tool | null> {
    return await prisma.tool.findUnique({where: { id }});
  },

  async findToolsByType(toolType: ToolType): Promise<Tool[]> {
    return await prisma.tool.findMany({where: {toolType}});
  },

  async createTool(data: CreateTool): Promise<Tool> {
    return await prisma.tool.create({data});
  },

  async updateTool(id: number, data: UpdateTool): Promise<Tool> {
    return await prisma.tool.update({where: {id}, data});
  },

  async deleteTool(id: number): Promise<void> {
    await prisma.tool.delete({where: {id}});
  }
}