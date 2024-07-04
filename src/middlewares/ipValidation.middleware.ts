import { RequestHandler } from 'express';



const ipValidationMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    if (ip == '::1') {
      next();
    } else {
      res.status(412).json({
        code: '412',
        message: 'Request Not Allowed From This IP'
      })
    }

  };
};

export default ipValidationMiddleware;
