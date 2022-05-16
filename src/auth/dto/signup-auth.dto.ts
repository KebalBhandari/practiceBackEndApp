import { Transform, TransformFnParams } from 'class-transformer';
import {  IsEmail,  IsNotEmpty,  IsString,  MinLength,} from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: 'User Name Cannot be Empty !!!'})
  UserName: string;

  @IsNotEmpty({message: 'Password Cannot be Empty !!!' })
  @MinLength(8, {message: 'Password should be at least 8 character long !!!'})
  UserPassword: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Email Cannot be Empty !!!' })
  @MinLength(7, {  message: 'Invalid Email Format !!!' })
  UserEmail: string;

  @IsNotEmpty({   message: 'Contact Number Cannot be Empty !!!' })
  @IsString() 
  @MinLength(7, {  message: 'Contact Number Length Should be at least 10 character long !!!'  })
  UserContactNo: string;

  @IsNotEmpty({   message: 'User Address Cannot be Empty !!!' })
  @IsString() 
  UserAddress: string;
}
