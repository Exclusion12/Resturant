import { StatusCodes } from "http-status-codes";
class uploadController {
    disallowed(req, res) {
        res.status(403).end(req.method + " oberation is not allowed!");
    }
    upload(req, res) {
        res.status(StatusCodes.OK).json(req.file);
    }
}
export default new uploadController();
