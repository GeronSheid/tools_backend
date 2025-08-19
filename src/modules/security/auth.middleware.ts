import { Request, Response, NextFunction } from "express";
import { verifyAccesToken } from "./jwt.service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log(token)
  if(!token) {
    return res.status(401).json({message: 'Authentication required'});
  }

  try {
    const decodedToken = verifyAccesToken(token);
    console.log(req)
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' })
  }
}