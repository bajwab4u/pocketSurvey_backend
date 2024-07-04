"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var index_controller_1 = __importDefault(require("@controllers/index.controller"));
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.indexController = new index_controller_1["default"]();
        this.initializeRoutes();
    }
    IndexRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), this.indexController.index);
    };
    return IndexRoute;
}());
exports["default"] = IndexRoute;
//# sourceMappingURL=index.route.js.map