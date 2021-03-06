import { Request, Response, NextFunction } from "express";
import AppError from "@errors/AppErrors";
import { sign } from "jsonwebtoken";

import verifyValidToken from "@utils/verifyValidToken";

import authConfig from "@config/auth";
import { verify } from "jsonwebtoken";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [_, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, exp } = decoded as { sub: string; exp: number };

    const tokenValid = verifyValidToken(exp);

    if (!tokenValid) {
      const { expiresIn, secret } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: sub,
        expiresIn,
      });
    }

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT token", 401);
  }
}

export default ensureAuthenticated;
