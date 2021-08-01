import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {
  async handle(req: Request, res: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    res.json(tags);
  }
}

export { ListTagsController };
