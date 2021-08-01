import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  async handle(req: Request, res: Response) {
    const listUsersController = new ListUsersService();

    const users = await listUsersController.execute();

    res.json(users);
  }
}

export { ListUsersController };
