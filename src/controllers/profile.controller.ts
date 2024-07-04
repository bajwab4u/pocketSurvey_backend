import { NextFunction, Request, Response } from 'express';
import { updateProfile_Dto, changePassword_Dto } from '@dtos/profile.dto';
import ProfileService from '@services/profile.service';

class ProfileController {
  public profileService = new ProfileService();

 

  


  public updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestData: updateProfile_Dto = req.body;
      const userId = req['user'].id;
      const { msg } = await this.profileService.updateProfile(userId , requestData);
      res.status(200).json({ success: true, msg: msg });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestData: changePassword_Dto = req.body;
      const userId = req['user'].id;
      const { msg } = await this.profileService.resetPassword(userId, requestData);
      res.status(200).json({ success: true, msg: 'Password Changed Successfully !' });
    } catch (error) {
      next(error);
    }
  };


}



export default ProfileController;
