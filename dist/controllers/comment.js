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
class commentsController {
    getall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes
                    .findById(req.params.dishId)
                    .populate("comments.author");
                if (dish) {
                    res.statusCode = StatusCodes.OK;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish.comments);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end("dish " + req.params.dishId + " not found");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes.findById(req.params.dishId);
                if (dish) {
                    req.body.author = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                    dish.comments.push(req.body);
                    yield dish.save();
                    res.status(StatusCodes.OK).json(dish);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end("dish " + req.params.dishId + " not found");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes.findById(req.params.dishId);
                if (dish) {
                    dish.comments = [];
                    yield dish.save();
                    res.status(StatusCodes.OK).json(dish);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end("dish " + req.params.dishId + " not found");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dish = yield dishes
                    .findById(req.params.dishId)
                    .populate("comments.author");
                if (dish != null &&
                    dish.comments.find((comment) => comment._id === req.params.commentId) !=
                        null) {
                    let comment = dish.comments.find((comment) => comment._id === req.params.commentId);
                    res.status(StatusCodes.OK).json(comment);
                }
                else if (!dish) {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Dish ${req.params.dishId} not found`);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Comment ${req.params.commentId} not found for post : ${req.params.postId}`);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateone(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let dish = yield dishes.findById(req.params.dishId);
            if (dish != null &&
                dish.comments.find((comment) => comment._id === req.params.commentId) !=
                    null &&
                ((_a = dish.comments.find((comment) => comment._id === req.params.commentId)) === null || _a === void 0 ? void 0 : _a.author) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
                if (req.body.rating) {
                    let commentIndex = dish.comments.findIndex((comment) => comment.id === req.params.commentId);
                    dish.comments[commentIndex].rating = req.body.rating;
                }
                if (req.body.comment) {
                    let commentIndex = dish.comments.findIndex((comment) => comment.id === req.params.commentId);
                    dish.comments[commentIndex].comment = req.body.comment;
                }
                yield dish.save();
                dishes
                    .findById(dish._id)
                    .populate("comments.author")
                    .then((dish) => {
                    res.statusCode = StatusCodes.OK;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish === null || dish === void 0 ? void 0 : dish.comments.find((comment) => comment._id === req.params.commentId));
                });
            }
            else if (dish == null) {
                res
                    .status(StatusCodes.NOT_FOUND)
                    .end("dish " + req.params.dishId + "not found");
            }
            else if (dish.comments.find((comment) => comment._id === req.params.commentId) ==
                null) {
                res
                    .status(StatusCodes.NOT_FOUND)
                    .end("comment " +
                    req.params.commentId +
                    "not found for dish " +
                    req.params.dishId);
            }
            else {
                res
                    .status(StatusCodes.FORBIDDEN)
                    .end("you are not authorized to perform this action !");
            }
        });
    }
    deleteone(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let dish = yield dishes
                .findById(req.params.dishId)
                .populate("comments.author");
            if (dish != null &&
                dish.comments.find((comment) => comment._id === req.params.commentId) !=
                    null &&
                ((_a = dish.comments.find((comment) => comment._id === req.params.commentId)) === null || _a === void 0 ? void 0 : _a.author) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
                let commentIndex = dish.comments.findIndex((comment) => comment._id === req.params.commentId);
                dish.comments[commentIndex].remove();
                yield dish.save();
                res.status(StatusCodes.OK).json(dish);
            }
            else if (dish == null) {
                res
                    .status(StatusCodes.NOT_FOUND)
                    .end("dish " + req.params.dishId + "not found");
            }
            else if (dish.comments.find((comment) => comment._id === req.params.commentId) ==
                null) {
                res
                    .status(StatusCodes.NOT_FOUND)
                    .end("comment " +
                    req.params.commentId +
                    " for dish " +
                    req.params.dishId +
                    "not found");
            }
            else {
                res
                    .status(StatusCodes.FORBIDDEN)
                    .end("you are not authorized to perform this action !");
            }
        });
    }
}
export default new commentsController();
