import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { changePassword_Dto, updateProfile_Dto } from '@dtos/profile.dto';
import ProfileController from '@/controllers/profile.controller';
import jwtAuthenticationMiddleware from '@/middlewares/jwtAuthentication.middleware';

class ProfileRoute implements Routes {
  public path = '/';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}updateProfile`, [validationMiddleware(updateProfile_Dto, 'body'),jwtAuthenticationMiddleware], this.profileController.updateProfile);
    this.router.post(`${this.path}changePassword`,[validationMiddleware(changePassword_Dto, 'body'),jwtAuthenticationMiddleware],this.profileController.changePassword)
  } 
}

export default ProfileRoute;
