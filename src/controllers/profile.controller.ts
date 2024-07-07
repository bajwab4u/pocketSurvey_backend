import { NextFunction, Request, Response } from "express";
import { updateProfile_Dto, changePassword_Dto } from "@dtos/profile.dto";
import ProfileService from "@services/profile.service";
import { ResponseInterface } from "@/interfaces/response.interface";

class ProfileController {
  public profileService = new ProfileService();

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestData: updateProfile_Dto = req.body;
      const userId = req["user"].id;
      const { user } = await this.profileService.updateProfile(
        userId,
        requestData
      );
      const response: ResponseInterface = {
        status: {
          result: "Success",
          message: `User profile has been updated.`,
          tokenExpired: false,
        },
        data: {
          user: {
            email: user.email,
            role: user.role || null,
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

  public changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestData: changePassword_Dto = req.body;
      const userId = req["user"].id;
      const { user } = await this.profileService.changePassword(
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
            role: user.role,
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
}

export default ProfileController;
