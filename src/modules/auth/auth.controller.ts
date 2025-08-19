import { Request, Response } from "express";
import { userRepository } from "../user/user.repository";
import { verifyPassword, createAccesToken, verifyRefreshToken } from "../security";
import { createUserSchema } from "../user/user.schema";
import { fromZodError } from "zod-validation-error";
import { loginSchema } from "./auth.schema";

import User from "../user";
import { accessCookieOptions, AuthService } from "./auth.service";

export const authController = {

  async register(req: Request, res: Response) {
    try {
      const result = createUserSchema.safeParse(req.body);
      if(!result.success) return res.status(400).json({
        error: "Validation error",
        deatails: fromZodError(result.error).message,
      });
      const {email, password, name} = result.data;

      const newUser = await User.userService.createUser({email, password, name});
      
      if (newUser) {
        const { password, ...safeUser } = newUser;
        const {accessToken, refreshToken} = AuthService.createTokens(safeUser);
        AuthService.setAuthCookies(res, accessToken, refreshToken);
        res.status(201).json({ user: safeUser });
      }
    } catch (error) {
      return res.status(500).json({ error: error }); //Дотипизировать ошибки
    }
  },

  async login(req: Request, res: Response) {
    try {

      const result = loginSchema.safeParse(req.body);
      if(!result.success) return res.status(400).json({
        error: "Validation error",
        details: fromZodError(result.error).message,
      });
      const { email, password } = result.data;

      const user = await userRepository.findByEmail(email);
      if (!user) return res.status(404).json({ error: "Пользователь не найден" });

      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: "Неверный пароль" });

      const {accessToken, refreshToken} = AuthService.createTokens({
        id: user.id,
        name: user.name,
        email: user.email
      })
      AuthService.setAuthCookies(res, accessToken, refreshToken);

      const { password: _, ...safeUser } = user;
      res.status(200).json({ user: safeUser });
    } catch (error) {
      return res.status(500).json({ error: error }); //Дотипизировать ошибки
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken) return res.status(401).json({error: 'There is no refresh token'});

    const payload = verifyRefreshToken(refreshToken);
    if(!payload) return res.status(403).json({error: 'Invalid token'});

    const user = await userRepository.findUserById(payload.id);
    if(!user) return res.status(404).json({error: 'User is not found'})

    const newAccessToken = createAccesToken({
          id: user.id,
          name: user.name,
          email: user.email
        });
    res.cookie("accessToken", newAccessToken, accessCookieOptions);

    const {password, ...saveUser} = user;
    res.json({user: saveUser});

    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}