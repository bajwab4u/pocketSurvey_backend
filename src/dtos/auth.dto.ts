import {  IsEmail, IsNotEmpty, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


export class userLogin_Dto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @IsNotEmpty()
  @IsString()
  public password: string;

}

export class resetPasswordEmail_Dto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
}


export class verifyOtp_Dto {
  @IsNotEmpty()
  @IsString()
  public otp: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
}

export class resendOtp_Dto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
}


@ValidatorConstraint({ name: 'customText', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    return object.password === value;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match';
  }
}



export class organizationSignup_Dto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public jobTitle: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordMatchConstraint, {
    message: 'Passwords do not match',
  })
  public confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  public webAddress: string;

}
