"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var scores_controller_1 = __importDefault(require("@/controllers/scores.controller"));
var ScoresRoute = /** @class */ (function () {
    //public indexController = new IndexController();
    function ScoresRoute() {
        this.path = '/scores';
        this.router = (0, express_1.Router)();
        this.scoresController = new scores_controller_1["default"]();
        this.initializeRoutes();
    }
    ScoresRoute.prototype.initializeRoutes = function () {
        // this.router.get(`${this.path}/:id(\\d+)`, this.scoresController.getScoresByUserId);
        // this.router.put(`${this.path}/add/:id(\\d+)`, validationMiddleware(UpdScorebyUserIdDto, 'body'), this.scoresController.updScoresbyUserId);
        //this.router.put(`${this.path}/add/:id(\\d+)`, this.indexController.index);
    };
    return ScoresRoute;
}());
exports["default"] = ScoresRoute;
//# sourceMappingURL=scores.route.js.map