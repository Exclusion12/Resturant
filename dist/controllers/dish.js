var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StatusCodes } from "http-status-codes";
import dishes from "../models/dishes.js";
class dishesController {
    getall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allDishes = yield dishes.find({}).populate("comments.author");
                res.status(StatusCodes.OK).json(allDishes);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes.create(req.body);
                res.status(StatusCodes.OK).json(dish);
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            dishes
                .deleteMany({})
                .then(() => {
                res.statusCode = StatusCodes.OK;
                res.setHeader("Content-Type", "application/json");
                res.json({ success: "All dishes have been deleted" });
            }, (err) => next(err))
                .catch((err) => next(err));
        });
    }
    getone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes
                    .findById(req.params.dishId)
                    .populate("comments.author");
                if (dish) {
                    res.status(StatusCodes.OK).json(dish);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Dish ${req.params.dishId} not found`);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true });
                if (dish) {
                    res.status(StatusCodes.OK).json(dish);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Dish ${req.params.dishId} not found`);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let dish = yield dishes.findByIdAndRemove(req.params.dishId, {
                new: true,
            });
            if (dish) {
                res.status(StatusCodes.OK).json(dish);
            }
            else {
                res
                    .status(StatusCodes.NOT_FOUND)
                    .end(`Dish ${req.params.dishId} not found`);
            }
        });
    }
}
export default new dishesController();
