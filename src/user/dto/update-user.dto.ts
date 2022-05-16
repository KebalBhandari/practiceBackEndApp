import { DateSchemaDefinition } from "mongoose";

export class UpdateUserDto{
    UserName: string;
    UserAddress: string;
    UserEmail: string;
    UserAge:number;
    UserUpdatedDate?: Date= new Date();
    Active: boolean;
}