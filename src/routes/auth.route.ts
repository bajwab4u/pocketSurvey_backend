import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import {
  userLogin_Dto,
  resetPassword_Dto,
  organizationSignup_Dto,
  verifyOtp_Dto,
  resendOtp_Dto,
} from "@dtos/auth.dto";
import { Routes } from "@interfaces/routes.interface";
import authMiddleware from "@middlewares/auth.middleware";
import validationMiddleware from "@middlewares/validation.middleware";
import jwtAuthenticationMiddleware from "@/middlewares/jwtAuthentication.middleware";

class AuthRoute implements Routes {
  public path = "/";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}login`,
      validationMiddleware(userLogin_Dto, "body"),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}verifyOtp`,
      [validationMiddleware(verifyOtp_Dto, "body")],
      this.authController.verifyOtp
    );
    this.router.post(
      `${this.path}resendOtp`,
      [validationMiddleware(resendOtp_Dto, "body")],
      this.authController.resendOtp
    );
    this.router.post(
      `${this.path}organizationSignup`,
      validationMiddleware(organizationSignup_Dto, "body"),
      this.authController.organizationSignup
    );
    this.router.post(
      `${this.path}sendResetPasswordLink`,
      validationMiddleware(resetPassword_Dto, "body"),
      this.authController.sendResetPasswordLink
    );
    this.router.post(
      `${this.path}signout`,
      jwtAuthenticationMiddleware,
      this.authController.signout
    );
  }
}

export default AuthRoute;
