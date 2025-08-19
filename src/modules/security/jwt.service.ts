import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || "access_secret",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
}

export function createAccesToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: "20m"
  });
}

export function createRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: "7d"
  });
}

export function verifyAccesToken(token: string): JwtPayload {
  return jwt.verify(token, jwtConfig.accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret) as JwtPayload;
  } catch {
    return null;
  }
}