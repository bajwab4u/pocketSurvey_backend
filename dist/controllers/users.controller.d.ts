import { NextFunction, Request, Response } from 'express';
import userService from '@services/users.service';
declare class UsersController {
    userService: userService;
    getUserByMsisdn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createUserOnActivity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    playGame: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default UsersController;
