import ScoresController from '@/controllers/scores.controller';
import { Routes } from '@interfaces/routes.interface';
declare class ScoresRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    scoresController: ScoresController;
    constructor();
    private initializeRoutes;
}
export default ScoresRoute;
