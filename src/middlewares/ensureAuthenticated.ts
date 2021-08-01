import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receive token

  const authToken = req.headers.authorization;

  // Check if token is not empty
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  // Check if token is valid
  try {
    const { sub } = verify(
      token,
      "3a5db06fee73af7cff22ffcc1225818a"
    ) as IPayload;
    req.user_id = sub;
  } catch (error) {
    return res.status(401).end();
  }

  // Retrieve user info

  return next();
}
