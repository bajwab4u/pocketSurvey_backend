"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var score_service_1 = __importDefault(require("@/services/score.service"));
var ScoresController = /** @class */ (function () {
    function ScoresController() {
        this.scoreService = new score_service_1["default"]();
        // public getScoresByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //   try {
        //     const userId = Number(req.params.id);
        //     const findUserScoreData: Scores = await this.scoreService.findScoresByUserId(userId);
        //     res.status(200).json({ data: findUserScoreData, message: 'findOne' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public updScoresbyUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //   try {
        //     const scoresData: UpdScorebyUserIdDto = req.body;
        //     const updScoresData: Scores | Scores[] = await this.scoreService.updScoreByUserId(scoresData);
        //     res.status(201).json({ data: updScoresData, message: 'updated!' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
    return ScoresController;
}());
exports["default"] = ScoresController;
//# sourceMappingURL=scores.controller.js.map