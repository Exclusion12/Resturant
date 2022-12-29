import { Router, Request, Response } from "express";
import bodyparser from "body-parser";
import * as authenticate from "../middleware/authenticate.js";
import { corsWithOptions, corsall } from "../middleware/cor.js";
import { StatusCodes } from "http-status-codes";
import dishController from "../controllers/dish.js";
import commentsController from "../controllers/comment.js";
import {
  ValidateSchema,
  validationSchemas,
} from "../middleware/validateSchema.js";

const dishrouter = Router();
dishrouter.use(bodyparser.json());

dishrouter
  .route("/")
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get(corsall, dishController.getall)
  .post(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      ValidateSchema(validationSchemas.dish.create),
    ],
    dishController.create
  )
  .put(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    (req: Request, res: Response) => {
      res.statusCode = 403;
      res.end("PUT operations is not allowed !");
    }
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    dishController.removeall
  );

dishrouter
  .route("/:dishId")
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get([corsall], dishController.getone)
  .post(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    (req: Request, res: Response) => {
      res.statusCode = 403;
      res.end("POST operations is not allowed at /dishes/" + req.params.dishId);
    }
  )
  .put(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      ValidateSchema(validationSchemas.dish.update),
    ],
    dishController.updateone
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    dishController.deleteone
  );

//comments section
dishrouter
  .route("/:dishId/comments")
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get([corsall], commentsController.getall)
  .post([corsWithOptions, authenticate.verifyUser], commentsController.create)
  .put(
    [corsWithOptions, authenticate.verifyUser],
    (req: Request, res: Response) => {
      res.statusCode = 403;
      res.end(
        "PUT operations is not allowed on /dishes/" +
          req.params.dishId +
          "/comments"
      );
    }
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    commentsController.removeall
  );

dishrouter
  .route("/:dishId/comments/:commentId")
  .options([corsWithOptions], (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get([corsall], commentsController.getone)
  .post(
    [corsWithOptions, authenticate.verifyUser],
    (req: Request, res: Response) => {
      res.statusCode = 403;
      res.end(
        "POST operations is not allowed on /dishes" +
          req.params.dishId +
          "/comments/" +
          req.params.commentId
      );
    }
  )
  .put([corsWithOptions, authenticate.verifyUser], commentsController.updateone)
  .delete(
    [corsWithOptions, authenticate.verifyUser],
    commentsController.deleteone
  );

export default dishrouter;
