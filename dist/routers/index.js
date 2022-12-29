import { Router } from "express";
import { corsall } from "../middleware/cor.js";
var router = Router();
/* GET home page. */
router.get("/", [corsall], (req, res) => {
    res.render("index", { title: "Express" });
});
export default router;
