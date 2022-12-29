import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import * as authenticate from "../middleware/authenticate.js";
import { corsall, corsWithOptions } from "../middleware/cor.js";
import StatusCodes from "http-status-codes";
import leaderController from "../controllers/leader.js";
import {
  ValidateSchema,
  validationSchemas,
} from "../middleware/validateSchema.js";

const leaderRouter = Router();
leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .options([corsWithOptions], (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get([corsall], leaderController.getall)
  .post(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      ValidateSchema(validationSchemas.leader.create),
    ],
    leaderController.create
  )
  .put(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    leaderController.disallowed
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    leaderController.deleteall
  );

leaderRouter
  .route("/:leaderId")
  .options([corsWithOptions], (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get([corsall], leaderController.getone)
  .post(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    leaderController.disallowed
  )
  .put(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      ValidateSchema(validationSchemas.leader.update),
    ],
    leaderController.updateone
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    leaderController.deleteone
  );

export default leaderRouter;
