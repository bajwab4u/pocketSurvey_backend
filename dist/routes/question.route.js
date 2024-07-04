"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var question_controller_1 = __importDefault(require("@/controllers/question.controller"));
var validation_middleware_1 = __importDefault(require("@middlewares/validation.middleware"));
var checkAnswer_middleware_1 = __importDefault(require("@/middlewares/checkAnswer.middleware"));
var question_dto_1 = require("@/dtos/question.dto");
var tokenValidation_middleware_1 = __importDefault(require("@/middlewares/tokenValidation.middleware"));
var jwtAuthentication_middleware_1 = __importDefault(require("@/middlewares/jwtAuthentication.middleware"));
var ipValidation_middleware_1 = __importDefault(require("@/middlewares/ipValidation.middleware"));
var QuestionRoute = /** @class */ (function () {
    function QuestionRoute() {
        this.path = '/question';
        this.router = (0, express_1.Router)();
        this.questionController = new question_controller_1["default"]();
        this.initializeRoutes();
    }
    QuestionRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), [(0, tokenValidation_middleware_1["default"])('jswallet'), jwtAuthentication_middleware_1["default"]], this.questionController.generateQuestion);
        this.router.post("".concat(this.path), [(0, ipValidation_middleware_1["default"])(), (0, tokenValidation_middleware_1["default"])('noetic'), (0, validation_middleware_1["default"])(question_dto_1.CreateQuestionDto, 'body')], this.questionController.createQuestion);
        this.router.post("".concat(this.path, "/check"), [(0, tokenValidation_middleware_1["default"])('jswallet'), jwtAuthentication_middleware_1["default"], checkAnswer_middleware_1["default"]], this.questionController.generateQuestion);
    };
    return QuestionRoute;
}());
exports["default"] = QuestionRoute;
//# sourceMappingURL=question.route.js.map