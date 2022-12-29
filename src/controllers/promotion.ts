import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Promotions from "../models/promotions.js";

class promoController {
  async getall(req: Request, res: Response, next: NextFunction) {
    try {
      let promotions = await Promotions.find({});
      res.status(StatusCodes.OK).json(promotions);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let promotion = await Promotions.create(req.body);
      res.status(StatusCodes.OK).json(promotion);
    } catch (error) {
      next(error);
    }
  }
  async deleteall(req: Request, res: Response, next: NextFunction) {
    try {
      await Promotions.deleteMany({});
      res
        .status(StatusCodes.OK)
        .json({ success: "All promotions have been deleted" });
    } catch (error) {
      next(error);
    }
  }
  async getone(req: Request, res: Response, next: NextFunction) {
    try {
      let promotion = await Promotions.findById(req.params.promoId);
      if (promotion) {
        res.status(StatusCodes.OK).json(promotion);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Promotion ${req.params.promoId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  async updateone(req: Request, res: Response, next: NextFunction) {
    try {
      let promotion = await Promotions.findByIdAndUpdate(
        req.params.promoId,
        { $set: req.body },
        { new: true }
      );
      if (promotion) {
        res.status(StatusCodes.OK).json(promotion);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Promotion ${req.params.promoId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteone(req: Request, res: Response, next: NextFunction) {
    try {
      let promotion = await Promotions.findByIdAndRemove(req.params.promoId, {
        new: true,
      });
      if (promotion) {
        res.status(StatusCodes.OK).json(promotion);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Promotion ${req.params.promoId} not found`);
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
export default new promoController();
