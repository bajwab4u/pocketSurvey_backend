"use strict";
exports.__esModule = true;
var IndexController = /** @class */ (function () {
    function IndexController() {
        this.index = function (req, res, next) {
            try {
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        };
    }
    return IndexController;
}());
exports["default"] = IndexController;
//# sourceMappingURL=index.controller.js.map