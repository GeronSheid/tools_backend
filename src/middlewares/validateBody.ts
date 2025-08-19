import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export function validateBody<T extends ZodRawShape>(schema: ZodObject<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.body);

      if(!result.success) {
        return res.status(400).json({
          status: 'Fail',
          error: 'Validation error',
          details: result.error.flatten(),
        })
      }
      if (result) req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  }
}