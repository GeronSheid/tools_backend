import { Request, Response } from "express";
import { toolsRepository } from "./tools.repository";
import { UpdateTool } from "./tools.schema";


export const toolsController = {
  async getAllTools(req: Request, res: Response) {
    const result = await toolsRepository.findAll();
    res.json(result);
  },

  async getToolById(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const tool = await toolsRepository.findToolById(+id);
      tool ? res.json(tool) : res.status(405).json({error: "Tool not found"});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getHandTools(req: Request, res: Response) {
    try {
      const tools = await toolsRepository.findToolsByType('HAND');
      res.json(tools);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getHeavyTools(req: Request, res: Response) {
    try {
      const tools = await toolsRepository.findToolsByType('HEAVY');
      res.json(tools);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getGeneratorTools(req: Request, res: Response) {
    try {
      const tools = await toolsRepository.findToolsByType('GENERATOR');
      res.json(tools);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getConstructionTools(req: Request, res: Response) {
    try {
      const tools = await toolsRepository.findToolsByType('CONSTRUCTION');
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

  async updateTool(req: Request<{id: number}, {}, UpdateTool>, res: Response) {
    try {
      const tool = await toolsRepository.updateTool(req.params.id, req.body);
      tool ? res.json(tool) : res.status(404).json({error: 'Tool not found'});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteTool(req: Request<{id: number}, {}, {}>, res: Response) {
    try {
      await toolsRepository.deleteTool(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({error: 'Tool not found'});
    }
  }
  
}