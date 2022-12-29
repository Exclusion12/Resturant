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
import Promotions from "../models/promotions.js";
class promoController {
    getall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promotions = yield Promotions.find({});
                res.status(StatusCodes.OK).json(promotions);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promotion = yield Promotions.create(req.body);
                res.status(StatusCodes.OK).json(promotion);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promotions.deleteMany({});
                res
                    .status(StatusCodes.OK)
                    .json({ success: "All promotions have been deleted" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promotion = yield Promotions.findById(req.params.promoId);
                if (promotion) {
                    res.status(StatusCodes.OK).json(promotion);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Promotion ${req.params.promoId} not found`);
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
                let promotion = yield Promotions.findByIdAndUpdate(req.params.promoId, { $set: req.body }, { new: true });
                if (promotion) {
                    res.status(StatusCodes.OK).json(promotion);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Promotion ${req.params.promoId} not found`);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promotion = yield Promotions.findByIdAndRemove(req.params.promoId, {
                    new: true,
                });
                if (promotion) {
                    res.status(StatusCodes.OK).json(promotion);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Promotion ${req.params.promoId} not found`);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    disallowed(req, res) {
        res
            .status(StatusCodes.FORBIDDEN)
            .end(req.method + " operation not supported on " + req.url);
    }
}
export default new promoController();
