import { hashPassword } from "../security";
import { userRepository } from "./user.repository";
import { CreateUser } from "./user.types";

export const userService = {
  async createUser(data: CreateUser) {
    const existingUser = await userRepository.findByEmail(data.email);
    if(existingUser) throw new Error('Email already in use');

    const hashedPassword = await hashPassword(data.password);
    return userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  },
}