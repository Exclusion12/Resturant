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
import Favourites from "../models/favourites.js";
import Dishes from "../models/dishes.js";
class favouriteController {
    getall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const favs = yield Favourites.findOne({ user: req.user._id })
                        .populate("dishes")
                        .populate("user");
                    if (favs) {
                        res.status(StatusCodes.OK).json({ favourites: favs });
                    }
                    else {
                        res.status(StatusCodes.NO_CONTENT).end();
                    }
                }
                catch (err) {
                    next(err);
                }
            }
            else {
                res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.dishId) {
                req.body = [{ dish: req.params.dishId }];
            }
            let dishes = yield Dishes.find({}, "_id");
            let dishesid = dishes.map((a) => a._id.toString());
            let rejected = [];
            if (req.user) {
                try {
                    let favourites = yield Favourites.findOne({ user: req.user._id });
                    if (favourites) {
                        for (let i = 0; i < req.body.length; i++) {
                            if (dishesid.indexOf(req.body[i].dish) !== -1 &&
                                favourites.dishes.indexOf(req.body[i].dish) !== -1) {
                                favourites.dishes.push(req.body[i].dish);
                            }
                            else if (dishesid.indexOf(req.body[i].dish) !== -1) {
                                rejected.push(req.body[i].dish);
                            }
                        }
                        yield favourites.save();
                        if (rejected.length > 0) {
                            res
                                .status(200)
                                .end("Succesfully added favourite dishes but " +
                                rejected +
                                " were not even dishes");
                        }
                        else {
                            res.status(200).end("Succesfully added favourite dishes");
                        }
                    }
                    else {
                        let fav = new Favourites({ user: req.user._id });
                        for (let i = 0; i < req.body.length; i++) {
                            if (dishesid.indexOf(req.body[i].dish) !== -1) {
                                fav.dishes.push(req.body[i].dish);
                            }
                            else {
                                rejected.push(req.body[i].dish);
                            }
                        }
                        yield fav.save();
                        if (rejected.length > 0) {
                            res
                                .status(200)
                                .end("Succesfully added favourite dishes but " +
                                rejected +
                                " were not even dishes");
                        }
                        else {
                            res.status(200).end("Succesfully added favourite dishes");
                        }
                    }
                }
                catch (error) {
                    next(error);
                }
            }
            else {
                res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
            }
        });
    }
    deleteall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    yield Favourites.deleteMany({ user: req.user._id });
                    res
                        .status(StatusCodes.OK)
                        .json({ success: "All favourites have been deleted" });
                }
                catch (error) {
                    next(error);
                }
            }
            else {
                res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
            }
        });
    }
    deleteone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    let favourite = yield Favourites.findOne({ user: req.user._id });
                    if (favourite) {
                        let index = favourite.dishes.indexOf(req.params.dishId);
                        if (index !== -1) {
                            favourite.dishes.splice(index, 1);
                            yield favourite.save();
                            res.status(StatusCodes.OK).json(favourite);
                        }
                        else {
                            res
                                .status(StatusCodes.NOT_FOUND)
                                .end("Dish " + req.params.dishId + " not found");
                        }
                    }
                    else {
                        res.status(StatusCodes.NOT_FOUND).end("Favorites not found");
                    }
                }
                catch (error) {
                    next(error);
                }
            }
            else {
                res.status(StatusCodes.FORBIDDEN).end("You are not authenticated");
            }
        });
    }
    disallowed(req, res) {
        res
            .status(StatusCodes.FORBIDDEN)
            .end(req.method + " operation not supported on " + req.url);
    }
}
export default new favouriteController();
