import { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import * as authenticate from "../middleware/authenticate.js";
import { corsall, corsWithOptions } from "../middleware/cor.js";
import { StatusCodes } from "http-status-codes";
import promoController from "../controllers/promotion.js";
import {
  ValidateSchema,
  validationSchemas,
} from "../middleware/validateSchema.js";

const promoRouter = Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .options([corsWithOptions], (req: Request, res: Response) => {
    res.status(StatusCodes.OK);
  })
  .get([corsall], promoController.getall)
  .post(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      ValidateSchema(validationSchemas.promotion.create),
    ],
    promoController.create
  )
  .put(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    promoController.disallowed
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    promoController.deleteall
  );

promoRouter
  .route("/:promoId")
  .options([corsWithOptions], (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get(corsall, promoController.getone)
  .post(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    promoController.disallowed
  )
  .put(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      ValidateSchema(validationSchemas.promotion.update),
    ],
    promoController.updateone
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    promoController.deleteone
  );

export default promoRouter;
