import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import  nodemailer  from 'nodemailer';
import { getRepository } from 'typeorm';
import {  organizationSignup_Dto, resetPasswordEmail_Dto, userLogin_Dto, verifyOtp_Dto } from '@dtos/auth.dto';
import { UserEntity } from '@entity/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

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

  public async login(userData: userLogin_Dto): Promise<{result , email }> {
    if (isEmpty(userData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `Email ${userData.email} not found`);

    const isPasswordMatching: boolean = await (userData.password == findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Incorrect Password");

    const otp = this.generateRandomOtp();
    await userRepository.update(findUser.id,{otp:otp});
    const info = await this.transporter.sendMail({
      from: '"Pocket Survey" <beyondsolutions051@gmail.com>',
      to: userData.email,
      subject: "OTP",
      text: `Your Verification OTP is ${otp}`,
      html: "",
    });
    return { email : findUser.email , result : 'Success'  };
  }

  public async resendOtp(userData: userLogin_Dto): Promise<{msg }> {
    if (isEmpty(userData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `Email ${userData.email} not found`);

    const otp = this.generateRandomOtp();
    await userRepository.update(findUser.id,{otp:otp});
    const info = await this.transporter.sendMail({
      from: '"Pocket Survey" <beyondsolutions051@gmail.com>',
      to: userData.email,
      subject: "OTP",
      text: `Your Verification OTP is ${otp}`,
      html: "",
    });
    return { msg : `Otp sent on ${findUser.email}` };
  }

  public async verifyOtp(requestData: verifyOtp_Dto): Promise<{ cookie: string; token: TokenData }> {
    if (isEmpty(requestData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { email: requestData.email } });
    if (!findUser) throw new HttpException(409, `User not found`);

    const isPasswordMatching: boolean = await (requestData.otp == findUser.otp);
    if (!isPasswordMatching) throw new HttpException(409, "Incorrect OTP");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, token: tokenData };
  }

  public async organizationSignup(requestData: userLogin_Dto): Promise< any> {
    if (isEmpty(requestData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const createOrganization = await userRepository.save(requestData);

    return createOrganization;
  }


  public async signout(userId: any): Promise<{msg}> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userData");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return {msg:'User Signout!'};
  }

  public async resetPassword(userData: resetPasswordEmail_Dto): Promise<{ msg  }> {
    if (isEmpty(userData)) throw new HttpException(400, "Not Valid User Data");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `Email ${userData.email} not found`);
    const info = await this.transporter.sendMail({
      from: '"Pocket Survey" <beyondsolutions051@gmail.com>',
      to: userData.email,
      subject: "Reset Account Password",
      text: "Click on the Link to reset the Password !",
      html: "<p> This <a href='https://pocketsurvey.co/'>link</a> will expire in 10 mins.</p>",
    });

    return { msg: info.messageId };
  } 

  public createToken(user: User): TokenData {
    console.log(user)
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
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
