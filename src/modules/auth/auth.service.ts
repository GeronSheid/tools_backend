import { CookieOptions, Response } from "express";
import { createAccesToken } from "../security"
import { createRefreshToken } from "../security/jwt.service";

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 15 * 60 * 1000, // 15 минут
};

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
};

export const AuthService = {
  createTokens(user: {id: string | number, name: string | null, email: string}) {
    const accessToken = createAccesToken(user);
    const refreshToken = createRefreshToken({id: user.id});
    return {accessToken, refreshToken}
  },

  setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('token', accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  }
}