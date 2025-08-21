import { Request, Response } from "express";
import { userRepository } from "../user/user.repository";
import { verifyPassword, createAccesToken, verifyRefreshToken } from "../security";
import { accessCookieOptions, AuthService } from "./auth.service";
import User from "../user";

export const authController = {

  async register(req: Request, res: Response) {
    try {
      const {email, password, name} = req.body;
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
      const { email, password } = req.body;

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