
export class CreateUserDto{
  UserName: string;
  UserAddress: string;
  UserEmail: string;
  UserAge:number;
  UserCreatedDate?: Date;
  Active: boolean;
}