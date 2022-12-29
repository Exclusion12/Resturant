import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dishes from "../models/dishes.js";

class commentsController {
  async getall(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes
        .findById(req.params.dishId)
        .populate("comments.author");

      if (dish) {
        res.statusCode = StatusCodes.OK;
        res.setHeader("Content-Type", "application/json");
        res.json(dish.comments);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end("dish " + req.params.dishId + " not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes.findById(req.params.dishId);
      if (dish) {
        req.body.author = req.user?._id;
        dish.comments.push(req.body);
        await dish.save();
        res.status(StatusCodes.OK).json(dish);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end("dish " + req.params.dishId + " not found");
      }
    } catch (error) {
      next(error);
    }
  }
  async removeall(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes.findById(req.params.dishId);
      if (dish) {
        dish.comments = [];
        await dish.save();
        res.status(StatusCodes.OK).json(dish);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end("dish " + req.params.dishId + " not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async getone(req: Request, res: Response, next: NextFunction) {
    try {
      let dish = await dishes
        .findById(req.params.dishId)
        .populate("comments.author");
      if (
        dish != null &&
        dish.comments.find((comment) => comment._id === req.params.commentId) !=
          null
      ) {
        let comment = dish.comments.find(
          (comment) => comment._id === req.params.commentId
        );
        res.status(StatusCodes.OK).json(comment);
      } else if (!dish) {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(`Dish ${req.params.dishId} not found`);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .end(
            `Comment ${req.params.commentId} not found for post : ${req.params.postId}`
          );
      }
    } catch (error) {
      next(error);
    }
  }
  async updateone(req: Request, res: Response, next: NextFunction) {
    let dish = await dishes.findById(req.params.dishId);
    if (
      dish != null &&
      dish.comments.find((comment) => comment._id === req.params.commentId) !=
        null &&
      dish.comments.find((comment) => comment._id === req.params.commentId)
        ?.author === req.user?._id
    ) {
      if (req.body.rating) {
        let commentIndex = dish.comments.findIndex(
          (comment) => comment.id === req.params.commentId
        );
        dish.comments[commentIndex].rating = req.body.rating;
      }
      if (req.body.comment) {
        let commentIndex = dish.comments.findIndex(
          (comment) => comment.id === req.params.commentId
        );
        dish.comments[commentIndex].comment = req.body.comment;
      }
      await dish.save();
      dishes
        .findById(dish._id)
        .populate("comments.author")
        .then((dish) => {
          res.statusCode = StatusCodes.OK;
          res.setHeader("Content-Type", "application/json");
          res.json(
            dish?.comments.find(
              (comment) => comment._id === req.params.commentId
            )
          );
        });
    } else if (dish == null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .end("dish " + req.params.dishId + "not found");
    } else if (
      dish.comments.find((comment) => comment._id === req.params.commentId) ==
      null
    ) {
      res
        .status(StatusCodes.NOT_FOUND)
        .end(
          "comment " +
            req.params.commentId +
            "not found for dish " +
            req.params.dishId
        );
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .end("you are not authorized to perform this action !");
    }
  }
  async deleteone(req: Request, res: Response, next: NextFunction) {
    let dish = await dishes
      .findById(req.params.dishId)
      .populate("comments.author");
    if (
      dish != null &&
      dish.comments.find((comment) => comment._id === req.params.commentId) !=
        null &&
      dish.comments.find((comment) => comment._id === req.params.commentId)
        ?.author === req.user?._id
    ) {
      let commentIndex = dish.comments.findIndex(
        (comment) => comment._id === req.params.commentId
      );
      dish.comments[commentIndex].remove();
      await dish.save();

      res.status(StatusCodes.OK).json(dish);
    } else if (dish == null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .end("dish " + req.params.dishId + "not found");
    } else if (
      dish.comments.find((comment) => comment._id === req.params.commentId) ==
      null
    ) {
      res
        .status(StatusCodes.NOT_FOUND)
        .end(
          "comment " +
            req.params.commentId +
            " for dish " +
            req.params.dishId +
            "not found"
        );
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .end("you are not authorized to perform this action !");
    }
  }
}
export default new commentsController();
