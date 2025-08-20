import { Request, Response } from "express";
import { toolsRepository } from "./tools.repository";
import { ToolType, UpdateTool } from "./tools.schema";


export const toolsController = {
  async getAllTools(req: Request, res: Response) {
    const result = await toolsRepository.findAll();
    res.json(result);
  },

  async getToolById(req: Request<{id: string}, {}, {}>, res: Response) {
    try {
      const {id} = req.params;
      const toolId = parseInt(id, 10);
      const tool = await toolsRepository.findToolById(toolId);
      tool ? res.json(tool) : res.status(405).json({error: "Tool not found"});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getTypeTools(req: Request<{type: ToolType}, {}, {}>, res: Response) {
    try {
      const {type} = req.params;
      const tools = await toolsRepository.findToolsByType(type);
      res.json(tools);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createTool(req: Request, res: Response) {
    try {
      const tool = await toolsRepository.createTool(req.body);
      res.status(201).json(tool);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateTool(req: Request<{id: string}, {}, UpdateTool>, res: Response) {
    try {
      const {id} = req.params;
      const toolId = parseInt(id, 10);
      const tool = await toolsRepository.updateTool(toolId, req.body);
      tool ? res.json(tool) : res.status(404).json({error: 'Tool not found'});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteTool(req: Request<{id: string}, {}, {}>, res: Response) {
    try {
      const {id} = req.params;
      const toolId = parseInt(id, 10);
      await toolsRepository.deleteTool(toolId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({error: 'Tool not found'});
    }
  }
  
}