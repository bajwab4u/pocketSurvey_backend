"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("@controllers/auth.controller"));
var users_dto_1 = require("@dtos/users.dto");
var validation_middleware_1 = __importDefault(require("@middlewares/validation.middleware"));
var AuthRoute = /** @class */ (function () {
    function AuthRoute() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1["default"]();
        this.initializeRoutes();
    }
    AuthRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.path, "login"), (0, validation_middleware_1["default"])(users_dto_1.userLogin_Dto, 'body'), this.authController.logIn);
    };
    return AuthRoute;
}());
exports["default"] = AuthRoute;
//# sourceMappingURL=auth.route.js.map