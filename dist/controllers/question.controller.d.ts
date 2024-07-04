import { NextFunction, Request, Response } from 'express';
import questionService from '@/services/question.service';
declare class QuestionController {
    questionService: questionService;
    createQuestion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    generateQuestion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    checkAnswer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default QuestionController;
