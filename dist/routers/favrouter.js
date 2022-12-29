import { Router } from "express";
import bodyparser from "body-parser";
import * as authenticate from "../middleware/authenticate.js";
import { corsWithOptions } from "../middleware/cor.js";
import StatusCodes from "http-status-codes";
import favouriteController from "../controllers/favourite.js";
import { ValidateSchema, validationSchemas, } from "../middleware/validateSchema.js";
const favrouter = Router();
favrouter.use(bodyparser.json());
favrouter
    .route("/")
    .options([corsWithOptions], (req, res) => {
    res.sendStatus(StatusCodes.OK);
})
    .get([corsWithOptions, authenticate.verifyUser], favouriteController.getall)
    .post([
    corsWithOptions,
    authenticate.verifyUser,
    ValidateSchema(validationSchemas.favourite),
], favouriteController.create)
    .put([corsWithOptions, authenticate.verifyUser], favouriteController.disallowed)
    .delete([corsWithOptions, authenticate.verifyUser], favouriteController.deleteall);
//////////////////////////////////////////////////////////
favrouter
    .route("/:dishId")
    .options([corsWithOptions], (req, res) => {
    res.sendStatus(StatusCodes.OK);
})
    .get([corsWithOptions, authenticate.verifyUser], favouriteController.disallowed)
    .post([corsWithOptions, authenticate.verifyUser], favouriteController.create)
    .put([corsWithOptions, authenticate.verifyUser], favouriteController.disallowed)
    .delete([corsWithOptions, authenticate.verifyUser], favouriteController.deleteone);
export default favrouter;
