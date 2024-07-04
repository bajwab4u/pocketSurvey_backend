import { RequestHandler } from 'express';



const tokenValidationMiddleware = (secret): RequestHandler => {
  return async (req, res, next) => {
    if (req.headers.token == secret) {
      next();
    } else {
      res.status(412).json({
        code: '412',
        message: 'Invalid Token'
      })
    }

  };
};

export default tokenValidationMiddleware;
