import { Request, Response } from "express";
import { userRepository } from "./user.repository";
import { CreateUser, UpdateUser } from "./user.schema";
import { userService } from "./user.service";

export const userController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.findAll()
    res.json(users)
  },

  async getUser(req: Request<{id: string}>, res: Response) {
    const {id} = req.params;
    const userId = parseInt(id, 10);
    const user = await userRepository.findUserById(userId);
    user ? res.json(user) : res.status(405).json({error: 'User not found'});
  },

  async createUser(req: Request<{}, {}, CreateUser>, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user)
    } catch (error) {
      if(error instanceof Error && error.message === 'Email already in use') {
        res.status(409).json({message: error.message})
      } else {
        console.error('Create user error:', error);
        res.status(500).json({message: 'Failed to create a user'})
      }
    }
  },

  async updateUser(req: Request<{id: string}, {}, UpdateUser>, res: Response) {
    try {
      const {id} = req.params;
      const userId = parseInt(id, 10);
      const user = await userRepository.update(userId, req.body);
      res.json(user);
    } catch (error) {
      res.status(404).json({error: 'User not found'});
    }
  },

  async deleteUser(req: Request<{id: string}>, res: Response) {
    try {
      const {id} = req.params;
      const userId = parseInt(id, 10);
      await userRepository.delete(userId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({error: 'User not found'});
    }
  }
}