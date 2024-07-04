import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import  nodemailer  from 'nodemailer';
import { getRepository } from 'typeorm';
import {  resetPasswordEmail_Dto, userLogin_Dto } from '@dtos/auth.dto';
import { UserEntity } from '@entity/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { changePassword_Dto, updateProfile_Dto } from '@/dtos/profile.dto';

class AuthService {
  public users = UserEntity;
  


  public async resetPassword(userId : any , requestData: changePassword_Dto): Promise<{ msg }> {
    if (isEmpty(requestData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId , password: requestData.oldPassword} });

    if (!findUser) throw new HttpException(409, `User don't exist`);
    await userRepository.update(findUser.id,{password:requestData.newPassword});
    

     return { msg: 'Password Changed Successfully !' };
  } 

  public async updateProfile(userId : any , requestData: updateProfile_Dto): Promise<{ msg }> {
    if (isEmpty(requestData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });

    if (!findUser) throw new HttpException(409, `User don't exist`);
    await userRepository.update(findUser.id,{
      name:requestData.name,
      phone:requestData.phone,
      email:requestData.email,
      organization:requestData.organization
    });
    

     return { msg: 'Profile Updated Successfully !' };
  } 

 

  
}

export default AuthService;
