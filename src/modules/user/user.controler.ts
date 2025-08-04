import { Request, Response } from "express";
import { userRepository } from "./User.repository";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

export const userController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.findAll()
    res.json(users)
  },

  async getUser(req: Request<{id: string}>, res: Response) {
    const {id} = req.params;
    const user = await userRepository.findUserById(+id);
    user ? res.json(user) : res.status(405).json({error: 'User not found'});
  },

  async createUser(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
      const existingUser = await userRepository.findByEmail(req.body.email);
      if(existingUser) {
        return res.status(409).json({error: 'Email already in use'})
      }
      const user = await userRepository.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({error: 'Failed to create a user'});
    }
  },

  async updateUser(req: Request<{id: number}, {}, UpdateUserInput>, res: Response) {
    try {
      const user = await userRepository.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(404).json({error: 'User not found'});
    }
  },

  async deleteUser(req: Request<{id: number}>, res: Response) {
    try {
      await userRepository.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({error: 'User not found'});
    }
  }
}