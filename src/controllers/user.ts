import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import users, { userDocument } from "../models/users.js";
import * as authenticate from "../middleware/authenticate.js";
import passport from "passport";

class usersController {
  async getall(req: Request, res: Response, next: NextFunction) {
    try {
      let allUsers = await users.find({});
      res.status(StatusCodes.OK).json(allUsers);
    } catch (error) {
      next(error);
    }
  }
  login(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      let token = authenticate.getToken({ _id: req.user._id });
      res.status(StatusCodes.OK).json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
  signup(req: Request, res: Response) {
    users.register(
      new users({ username: req.body.username }),
      req.body.password,
      (err, user: userDocument) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          if (req.body.firstname) {
            user.firstname = req.body.firstname;
          }
          if (req.body.lastname) {
            user.lastname = req.body.lastname;
          }
          user.save((err) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
              return;
            } else {
              passport.authenticate("local")(this.login);
            }
          });
        }
      }
    );
  }
  async getone(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        let user = await users.findById(req.user._id);
        if (user) {
          res.status(StatusCodes.OK).json(user);
        } else {
          res.status(StatusCodes.NOT_FOUND).end("User profile not found");
        }
      } catch (error) {
        next(error);
      }
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        let user = await users.findByIdAndUpdate(
          req.user._id,
          { $set: req.body },
          { new: true }
        );
        if (user)
          res.status(StatusCodes.OK).end("User profile updated succesfuly!");
        else {
          res.status(StatusCodes.NOT_FOUND).end("User not found!");
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).end("You are not authorized");
    }
  }
  async deleteOne(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        await users.findByIdAndRemove(req.user._id);
        res
          .status(StatusCodes.OK)
          .end(`User ${req.user._id} deleted permentaly !`);
      } catch (error) {
        next(error);
      }
    }
  }
  async updatePassword(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      try {
        let user = await users.findById(req.user._id);
        if (user) {
          await user.changePassword(req.body.oldPassword, req.body.newPassword);
          await user.save();
          res.status(StatusCodes.OK).end("Password updated");
        }
      } catch (error) {
        next(error);
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).end("You are not authorized");
    }
  }
  disallowed(req: Request, res: Response) {
    res
      .status(StatusCodes.FORBIDDEN)
      .end(req.method + " operations are not allowed on " + req.url);
  }
}
export default new usersController();
