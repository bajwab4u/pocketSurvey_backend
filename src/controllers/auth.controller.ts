import { NextFunction, Request, Response } from 'express';
import { organizationSignup_Dto, resetPasswordEmail_Dto, userLogin_Dto, verifyOtp_Dto } from '@dtos/auth.dto';
import AuthService from '@services/auth.service';
import { ResponseInterface } from '@/interfaces/response.interface';

class AuthController {
  public authService = new AuthService();

 

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: userLogin_Dto = req.body;
      const { result , email } = await this.authService.login(userData);
      
      const response: ResponseInterface = {
        status: {
          result:result,
          message:`Verification OTP is sent on ${email}`,
          tokenExpired:false
        },
        data:{

        },
        pagination:{

        }
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestData: verifyOtp_Dto = req.body;
      const { cookie, token } = await this.authService.verifyOtp(requestData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ success: true, token: token.token });
    } catch (error) {
      next(error);
    }
  };

  public resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: userLogin_Dto = req.body;
      const { msg } = await this.authService.resendOtp(userData);
      res.status(200).json({ success: true, msg: msg });
    } catch (error) {
      next(error);
    }
  };


  public organizationSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestData: organizationSignup_Dto = req.body;
      const { msg } = await this.authService.organizationSignup(requestData);
      res.status(200).json({ success: true, msg: 'New Organization Created' });
    } catch (error) {
      next(error);
    }
  };


  public resetPasswordEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: resetPasswordEmail_Dto = req.body;
      const { msg } = await this.authService.resetPassword(userData);
      res.status(200).json({ success: true, msg: msg });
    } catch (error) {
      next(error);
    }
  };

  public signout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req["user"].id;
      const { msg } = await this.authService.signout(userId);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: msg });
    } catch (error) {
      next(error);
    }
  };
  };






export default AuthController;
