import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;

  const usersRepositories = getCustomRepository(UsersRepositories);

  // Check if user is admin
  const { admin } = await usersRepositories.findOne(user_id);

  if (admin) {
    return next();
  }

  return res.status(401).json({
    error: "User not authorized",
  });
}
