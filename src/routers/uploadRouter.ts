import express, { Request, Response } from "express";
import bodyparser from "body-parser";
import * as authenticate from "../middleware/authenticate.js";
import multer from "multer";
import { corsall, corsWithOptions } from "../middleware/cor.js";
import { StatusCodes } from "http-status-codes";
import uploadController from "../controllers/upload.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const imagesFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new Error("you can only upload images files !!"));
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter: imagesFilter });

const uploadrouter = express.Router();
uploadrouter.use(bodyparser.json());

uploadrouter
  .route("/")
  .options([corsWithOptions], (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK);
  })
  .get(
    [corsall, authenticate.verifyUser, authenticate.verifyAdmin],
    uploadController.disallowed
  )
  .post(
    [
      corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      upload.single("imagefile"),
    ],
    uploadController.upload
  )
  .put(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    uploadController.disallowed
  )
  .delete(
    [corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin],
    uploadController.disallowed
  );

export default uploadrouter;
