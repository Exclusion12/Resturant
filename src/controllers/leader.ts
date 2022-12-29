import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Leaders from "../models/leaders.js";

class leaderController {
  async getall(req: Request, res: Response, next: NextFunction) {
    try {
      let leaders = await Leaders.find({});
      res.status(StatusCodes.OK).json(leaders);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let leader = await Leaders.create(req.body);
      res.status(StatusCodes.OK).json(leader);
    } catch (error) {
      next(error);
    }
  }
  async deleteall(req: Request, res: Response, next: NextFunction) {
    try {
      await Leaders.deleteMany({});
      res
        .status(StatusCodes.OK)
        .json({ success: "All leaders have been deleted" });
    } catch (error) {
      next(error);
    }
  }
  async getone(req: Request, res: Response, next: NextFunction) {
    try {
      let leader = await Leaders.findById(req.params.leaderId);
      if (leader) {
        res.status(StatusCodes.OK).json(leader);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Leader ${req.params.leaderId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  async updateone(req: Request, res: Response, next: NextFunction) {
    try {
      let leader = await Leaders.findByIdAndUpdate(
        req.params.leaderId,
        { $set: req.body },
        { new: true }
      );
      if (leader) {
        res.status(StatusCodes.OK).json(leader);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Leader ${req.params.leaderId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteone(req: Request, res: Response, next: NextFunction) {
    try {
      let leader = await Leaders.findByIdAndRemove(req.params.leaderId, {
        new: true,
      });
      if (leader) {
        res.status(StatusCodes.OK).json(leader);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Leader ${req.params.leaderId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  disallowed(req: Request, res: Response) {
    res
      .status(StatusCodes.FORBIDDEN)
      .end(req.method + " operation not supported on " + req.url);
  }
}
export default new leaderController();
