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
import Leaders from "../models/leaders.js";
class leaderController {
    getall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let leaders = yield Leaders.find({});
                res.status(StatusCodes.OK).json(leaders);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let leader = yield Leaders.create(req.body);
                res.status(StatusCodes.OK).json(leader);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Leaders.deleteMany({});
                res
                    .status(StatusCodes.OK)
                    .json({ success: "All leaders have been deleted" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getone(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let leader = yield Leaders.findById(req.params.leaderId);
                if (leader) {
                    res.status(StatusCodes.OK).json(leader);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Leader ${req.params.leaderId} not found`);
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
                let leader = yield Leaders.findByIdAndUpdate(req.params.leaderId, { $set: req.body }, { new: true });
                if (leader) {
                    res.status(StatusCodes.OK).json(leader);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Leader ${req.params.leaderId} not found`);
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
                let leader = yield Leaders.findByIdAndRemove(req.params.leaderId, {
                    new: true,
                });
                if (leader) {
                    res.status(StatusCodes.OK).json(leader);
                }
                else {
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .end(`Leader ${req.params.leaderId} not found`);
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
export default new leaderController();
