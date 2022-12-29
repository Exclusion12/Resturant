import { Router, Request, Response } from "express";
import { corsall } from "../middleware/cor.js";
var router = Router();

/* GET home page. */
router.get("/", [corsall], (req: Request, res: Response) => {
  res.render("index", { title: "Express" });
});

export default router;
