"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var users_controller_1 = __importDefault(require("@controllers/users.controller"));
var validation_middleware_1 = __importDefault(require("@middlewares/validation.middleware"));
var users_dto_1 = require("@/dtos/users.dto");
var tokenValidation_middleware_1 = __importDefault(require("@/middlewares/tokenValidation.middleware"));
var recaptchaValidation_middleware_1 = __importDefault(require("@/middlewares/recaptchaValidation.middleware"));
var UsersRoute = /** @class */ (function () {
    function UsersRoute() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new users_controller_1["default"]();
        this.initializeRoutes();
    }
    UsersRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path, "/:msisdn(\\d+)"), [(0, tokenValidation_middleware_1["default"])('jswallet'), (0, validation_middleware_1["default"])(users_dto_1.CreateUserByParamsDto, 'params')], this.usersController.getUserByMsisdn);
        this.router.post("".concat(this.path, "/activity"), [(0, tokenValidation_middleware_1["default"])('jswallet'), (0, validation_middleware_1["default"])(users_dto_1.CreateUserDto, 'body')], this.usersController.createUserOnActivity);
        // this.router.post(`${this.path}/play`, [tokenValidationMiddleware(),recaptchaValidationMiddleware(),validationMiddleware(CreateUserDto, 'body')], this.usersController.playGame);
        this.router.post("".concat(this.path, "/play"), [(0, tokenValidation_middleware_1["default"])('jswallet'), (0, recaptchaValidation_middleware_1["default"])(), (0, validation_middleware_1["default"])(users_dto_1.CreateUserDto, 'body')], this.usersController.playGame);
    };
    return UsersRoute;
}());
exports["default"] = UsersRoute;
//# sourceMappingURL=users.route.js.map