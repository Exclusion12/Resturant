import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
class uploadController {
  disallowed(req: Request, res: Response) {
    res.status(403).end(req.method + " oberation is not allowed!");
  }
  upload(req: Request, res: Response) {
    res.status(StatusCodes.OK).json(req.file);
  }
}
export default new uploadController();
