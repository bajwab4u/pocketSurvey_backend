import {  IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class changePassword_Dto  {
  @IsNotEmpty()
  @IsString()
  public oldPassword: string;
  
  @IsNotEmpty()
  @IsString()
  public newPassword: string;

}



export class updateProfile_Dto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public organization: string;

  
}
