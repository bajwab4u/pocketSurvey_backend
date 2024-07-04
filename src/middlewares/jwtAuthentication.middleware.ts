import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { UserEntity } from '@entity/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const jwtAuthenticationMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.Authorization;
    console.log(token)
    if (token) {
        jwt.verify(token,'bysAdmin', (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            next(new HttpException(401, 'Wrong Jwt authentication token'));
            
          } else {
            req.user = decodedToken;
            next();
          }
        });
      }else{
        next(new HttpException(401, 'Wrong Jwt authentication token'));
      }
  } catch (error) {
    next(new HttpException(401, 'Wrong Jwt authentication token'));
  }
};

export default jwtAuthenticationMiddleware;
