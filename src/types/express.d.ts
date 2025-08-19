import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // или более конкретный тип, если ты знаешь структуру токена
    }
  }
}