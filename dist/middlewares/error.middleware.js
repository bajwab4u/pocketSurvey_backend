"use strict";
exports.__esModule = true;
var logger_1 = require("@utils/logger");
var errorMiddleware = function (error, req, res, next) {
    try {
        var status = error.status || 500;
        var message = error.message || 'Something went wrong';
        logger_1.logger.error("[".concat(req.method, "] ").concat(req.path, " >> StatusCode:: ").concat(status, ", Message:: ").concat(message));
        res.status(status).json({ message: message });
    }
    catch (error) {
        next(error);
    }
};
exports["default"] = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map