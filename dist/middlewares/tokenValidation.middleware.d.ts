import { RequestHandler } from 'express';
declare const tokenValidationMiddleware: (secret: any) => RequestHandler;
export default tokenValidationMiddleware;
