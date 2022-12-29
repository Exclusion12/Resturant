import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Favourites from "../models/favourites.js";
import Dishes from "../models/dishes.js";
class favouriteController {
  async getall(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        const favs = await Favourites.findOne({ user: req.user._id })
          .populate("dishes")
          .populate("user");
        res.status(StatusCodes.OK).json({ favourites: favs });
      } catch (err) {
        next(err);
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (req.params.dishId) {
      req.body = [{ dish: req.params.dishId }];
    }
    let dishes = await Dishes.find({}, "_id");
    let dishesid = dishes.map((a) => a._id.toString());
    let rejected: string[] = [];
    if (req.user) {
      try {
        let favourites = await Favourites.findOne({ user: req.user._id });
        if (favourites) {
          for (let i = 0; i < req.body.length; i++) {
            if (
              dishesid.indexOf(req.body[i].dish) !== -1 &&
              favourites.dishes.indexOf(req.body[i].dish) !== -1
            ) {
              favourites.dishes.push(req.body[i].dish);
            } else if (dishesid.indexOf(req.body[i].dish) !== -1) {
              rejected.push(req.body[i].dish);
            }
          }
          await favourites.save();
          if (rejected.length > 0) {
            res
              .status(200)
              .end(
                "Succesfully added favourite dishes but " +
                  rejected +
                  " were not even dishes"
              );
          } else {
            res.status(200).end("Succesfully added favourite dishes");
          }
        } else {
          let fav = new Favourites({ user: req.user._id });
          for (let i = 0; i < req.body.length; i++) {
            if (dishesid.indexOf(req.body[i].dish) !== -1) {
              fav.dishes.push(req.body[i].dish);
            } else {
              rejected.push(req.body[i].dish);
            }
          }
          await fav.save();
          if (rejected.length > 0) {
            res
              .status(200)
              .end(
                "Succesfully added favourite dishes but " +
                  rejected +
                  " were not even dishes"
              );
          } else {
            res.status(200).end("Succesfully added favourite dishes");
          }
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
    }
  }

  async deleteall(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        await Favourites.deleteMany({ user: req.user._id });
        res
          .status(StatusCodes.OK)
          .json({ success: "All favourites have been deleted" });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
    }
  }
  async deleteone(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        let favourite = await Favourites.findOne({ user: req.user._id });
        if (favourite) {
          let index = favourite.dishes.indexOf(req.params.dishId);
          if (index !== -1) {
            favourite.dishes.splice(index, 1);
            await favourite.save();
            res.status(StatusCodes.OK).json(favourite);
          } else {
            res
              .status(StatusCodes.NOT_FOUND)
              .end("Dish " + req.params.dishId + " not found");
          }
        } else {
          res.status(StatusCodes.NOT_FOUND).end("Favorites not found");
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
    }
  }
  disallowed(req: Request, res: Response) {
    res
      .status(StatusCodes.FORBIDDEN)
      .end(req.method + " operation not supported on " + req.url);
  }
}
export default new favouriteController();
