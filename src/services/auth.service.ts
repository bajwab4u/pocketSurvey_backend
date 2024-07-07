import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { getRepository } from "typeorm";
import {
  organizationSignup_Dto,
  resetPassword_Dto,
  sendResetPassword_Dto,
  userLogin_Dto,
  verifyOtp_Dto,
} from "@dtos/auth.dto";
import { UserEntity } from "@entity/users.entity";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { isEmpty } from "@utils/util";

class AuthService {
  public users = UserEntity;
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "beyondsolutions051@gmail.com",
      pass: "qbvcwknimpsovqcf",
    },
  });

  public async resetPassword(
    userId: any,
    requestData: resetPassword_Dto
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

    await userRepository.update(findUser.id, {
      password: requestData.confirmPassword,
    });

    return { user: findUser };
  }

  public async login(
    userData: userLogin_Dto
  ): Promise<{ user: User; msg: string; token?: TokenData; cookie?: string }> {
    if (isEmpty(userData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { email: userData.email },
    });
    if (!findUser) {
      const error: Error = new Error(`Email ${userData.email} not found.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const isPasswordMatching: boolean = await (userData.password ==
      findUser.password);
    if (!isPasswordMatching) {
      const error: Error = new Error(`Incorrect Password.`);
      (error as any).errorCode = 409;
      throw error;
    }

    if (findUser.isTwoFactorAuthEnabled == false) {
      const tokenData = this.createToken(findUser);
      const cookie = this.createCookie(tokenData);
      return {
        user: findUser,
        msg: `${findUser.email} loggedIn successfully`,
        token: tokenData,
        cookie: cookie,
      };
    }

    const otp = this.generateRandomOtp();
    await userRepository.update(findUser.id, { otp: otp });
    const info = await this.transporter.sendMail({
      from: '"Pocket Survey" <beyondsolutions051@gmail.com>',
      to: userData.email,
      subject: "OTP",
      text: `Your Verification OTP is ${otp}.`,
      html: "",
    });
    return {
      user: findUser,
      msg: `A verification OTP has been sent to ${findUser.email}.`,
    };
  }

  public async resendOtp(requestData: userLogin_Dto): Promise<{ user: User }> {
    if (isEmpty(requestData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { email: requestData.email },
    });
    if (!findUser) {
      const error: Error = new Error(`Email ${requestData.email} not found.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const otp = this.generateRandomOtp();
    await userRepository.update(findUser.id, { otp: otp });
    const info = await this.transporter.sendMail({
      from: '"Pocket Survey" <beyondsolutions051@gmail.com>',
      to: requestData.email,
      subject: "OTP",
      text: `Your Verification OTP is ${otp}.`,
      html: "",
    });
    return { user: findUser };
  }

  public async verifyOtp(
    requestData: verifyOtp_Dto
  ): Promise<{ cookie: string; token: TokenData; user: User }> {
    if (isEmpty(requestData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { email: requestData.email },
    });
    if (!findUser) {
      const error: Error = new Error(`Email ${requestData.email} not found.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const isPasswordMatching: boolean = await (requestData.otp == findUser.otp);
    if (!isPasswordMatching) {
      const error: Error = new Error(`Incorrect Otp.`);
      (error as any).errorCode = 409;
      throw error;
    }

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, token: tokenData, user: findUser };
  }

  public async organizationSignup(
    requestData: organizationSignup_Dto
  ): Promise<{ user: User }> {
    if (isEmpty(requestData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    try {
      var createOrganization = await userRepository.save(requestData);
    } catch (er) {
      const error: Error = new Error(
        `User with email ${requestData.email} already exists.`
      );
      (error as any).errorCode = 409;
      throw error;
    }

    return { user: createOrganization };
  }

  public async signout(userId: any): Promise<{ user: User }> {
    if (isEmpty(userId)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      {
        const error: Error = new Error(`User not found.`);
        (error as any).errorCode = 404;
        throw error;
      }
    }

    return { user: findUser };
  }

  public async sendResetPasswordLink(
    requestData: sendResetPassword_Dto
  ): Promise<{ user: User }> {
    if (isEmpty(requestData)) {
      const error: Error = new Error(`Not Valid User Data.`);
      (error as any).errorCode = 404;
      throw error;
    }

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({
      where: { email: requestData.email },
    });
    if (!findUser) {
      const error: Error = new Error(`Email ${requestData.email} not found.`);
      (error as any).errorCode = 404;
      throw error;
    }
    const tokenData = this.createToken(findUser);
    const url = `http://localhost:4200/resetPassword?token=${encodeURIComponent(
      tokenData.token
    )}`;
    console.log(url);
    const info = await this.transporter.sendMail({
      from: '"Pocket Survey" <beyondsolutions051@gmail.com>',
      to: requestData.email,
      subject: "Reset Account Password",
      text: `Your reset password link is "${url}". This link will expire in 10mins.`,
      html: `<p> Your reset password link is <a href='${url}'>link</a>. This link will expire in 10 mins.</p>`,
    });

    return { user: findUser };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get("secretKey");
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public generateRandomOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
