import {prisma} from '../prisma/prisma.service';
import type { User, CreateUser, UpdateUserData } from './user.types';

export const userRepository = {
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  },

  async findUserById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({where: { id }})
  },

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({where: {email}})
  },

  async createUser(data: CreateUser): Promise<User> {
    return await prisma.user.create({data})
  },

  async update(id: number, data: UpdateUserData): Promise<User> {
    return await prisma.user.update({where: {id}, data})
  },

  async delete(id: number): Promise<void> {
    await prisma.user.delete({where: {id}})
  }
}