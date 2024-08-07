import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { getRepository } from "typeorm";
import { UserEntity } from "@entity/users.entity";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { isEmpty } from "@utils/util";
import { changePassword_Dto, updateProfile_Dto } from "@/dtos/profile.dto";

class AuthService {
  public users = UserEntity;

  public async changePassword(
    userId: any,
    requestData: changePassword_Dto
  ): Promise<{ user: User }> {
    if (isEmpty(requestData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { id: userId },
    });

    if (!findUser) {
      const error: Error = new Error(`User don't exist.`);
      (error as any).errorCode = 409;
      throw error;
    }

    
    if (findUser.password != requestData.oldPassword) {
      const error: Error = new Error(`Incorrect Password`);
      (error as any).errorCode = 409;
      throw error;
    }

    if (requestData.oldPassword == requestData.newPassword) {
      const error: Error = new Error(`Old and new shouldn't be same.`);
      (error as any).errorCode = 409;
      throw error;
    }

      await userRepository.update(findUser.id, {
        password: requestData.newPassword,
      });
  
    
    
    
    return { user: findUser };
  }

  public async updateProfile(
    userId: any,
    requestData: updateProfile_Dto
  ): Promise<{ user: any }> {
    if (isEmpty(requestData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { id: userId },
    });

    if (!findUser) {
      const error: Error = new Error(`User don't exist.`);
      (error as any).errorCode = 409;
      throw error;
    }

    try{
       await userRepository.update(findUser.id, {
        name: requestData.name,
        phone: requestData.phone,
        email: requestData.email,
        organization: requestData.organization,
      });
      var updatedUser = await userRepository.findOne(findUser.id);
    }catch(err){
    
        const error: Error = new Error(`User with this email already exists.`);
        (error as any).errorCode = 404;
        throw error;
      
    }
    

    return { user: updatedUser };
  }
}

export default AuthService;
