import { NextFunction, Request, Response } from "express";
import {
  organizationSignup_Dto,
  resetPassword_Dto,
  sendResetPassword_Dto,
  userLogin_Dto,
  userLogout_Dto,
  verifyOtp_Dto,
} from "@dtos/auth.dto";
import AuthService from "@services/auth.service";
import { ResponseInterface } from "@/interfaces/response.interface";

class AuthController {
  public authService = new AuthService();

  public logIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: userLogin_Dto = req.body;
      const { user, msg, token, cookie } = await this.authService.login(
        userData
      );

      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: msg,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
            isTwoFactorAuthEnabled: user.isTwoFactorAuthEnabled,
          },
        },
        pagination: {
          paginationEnabled: false,
        },
      };
      if (user.isTwoFactorAuthEnabled == false) {
        response.data.authToken =
          user.isTwoFactorAuthEnabled == false ? token : null;
        res.setHeader("Set-Cookie", [cookie]);
      }
      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };

      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };

  public verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestData: verifyOtp_Dto = req.body;
      const { cookie, token, user } = await this.authService.verifyOtp(
        requestData
      );
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `Login Succesfuly`,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
          },
          authToken: token,
        },
        pagination: {
          paginationEnabled: false,
        },
      };
      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };

      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };

  public resendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestData: userLogin_Dto = req.body;
      const { user } = await this.authService.resendOtp(requestData);
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `A verification OTP has been sent to ${user.email}.`,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
          },
        },
        pagination: {
          paginationEnabled: false,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };
      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };

  public organizationSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestData: organizationSignup_Dto = req.body;
      const { user } = await this.authService.organizationSignup(requestData);
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `User with email ${user.email} has been created.`,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
          },
        },
        pagination: {
          paginationEnabled: false,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };
      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };

  public sendResetPasswordLink = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: sendResetPassword_Dto = req.body;
      const { user } = await this.authService.sendResetPasswordLink(userData);
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `Reset Password Link has been sent to ${user.email}.`,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
          },
        },
        pagination: {
          paginationEnabled: false,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };
      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log(req);
    console.log(req["user"].id);

    try {
      const requestData: resetPassword_Dto = req.body;
      const userId = req["user"].id;
      const { user } = await this.authService.resetPassword(
        userId,
        requestData
      );
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `${user.email} password has been changed successfully.`,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
          },
        },
        pagination: {
          paginationEnabled: false,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };
      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };

  public signout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: userLogout_Dto = req["user"].id;
      const { user } = await this.authService.signout(userId);
      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `${user.email} has been logged out.`,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      const errorResponse: ResponseInterface = {
        status: {
          result: "Failure",
          message: error.message,
          tokenExpired: false,
        },
        data: {},
        pagination: {
          paginationEnabled: false,
        },
      };
      const statusCode = (error as any).errorCode;

      res.status(statusCode).json(errorResponse);
      next(error);
    }
  };
}

export default AuthController;
