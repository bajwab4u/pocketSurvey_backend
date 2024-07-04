import QuestionController from '@/controllers/question.controller';
import { Routes } from '@interfaces/routes.interface';
declare class QuestionRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    questionController: QuestionController;
    constructor();
    private initializeRoutes;
}
export default QuestionRoute;
