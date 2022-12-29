import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dishes from "../models/dishes.js";

class dishesController {
  async getall(req: Request, res: Response, next: NextFunction) {
    try {
      let allDishes = await dishes.find({}).populate("comments.author");
      res.status(StatusCodes.OK).json(allDishes);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes.create(req.body);
      res.status(StatusCodes.OK).json(dish);
    } catch (error) {
      next(error);
    }
  }
  async removeall(req: Request, res: Response, next: NextFunction) {
    dishes
      .deleteMany({})
      .then(
        () => {
          res.statusCode = StatusCodes.OK;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: "All dishes have been deleted" });
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
  async getone(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes
        .findById(req.params.dishId)
        .populate("comments.author");
      if (dish) {
        res.status(StatusCodes.OK).json(dish);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Dish ${req.params.dishId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  async updateone(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes.findByIdAndUpdate(
        req.params.dishId,
        { $set: req.body },
        { new: true }
      );
      if (dish) {
        res.status(StatusCodes.OK).json(dish);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Dish ${req.params.dishId} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteone(req: Request, res: Response, next: NextFunction) {
    let dish = await dishes.findByIdAndRemove(req.params.dishId, {
      new: true,
    });
    if (dish) {
      res.status(StatusCodes.OK).json(dish);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .end(`Dish ${req.params.dishId} not found`);
    }
  }
}
export default new dishesController();
