import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'User Email is Required !!!' })
  @Transform(({ value }: TransformFnParams) => value?.trim())

  UserEmail: string;

  @IsNotEmpty({ message: 'Password is required !!!' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  UserPassword: string;
}