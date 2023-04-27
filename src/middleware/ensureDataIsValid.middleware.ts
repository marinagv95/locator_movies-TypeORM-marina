import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";

const ensureDataIsValideMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validateData = schema.parse(req.body);
    req.body = validateData;

    return next();
  };

export default ensureDataIsValideMiddleware;
