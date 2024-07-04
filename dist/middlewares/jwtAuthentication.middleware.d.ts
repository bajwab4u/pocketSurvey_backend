import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
declare const jwtAuthenticationMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export default jwtAuthenticationMiddleware;
