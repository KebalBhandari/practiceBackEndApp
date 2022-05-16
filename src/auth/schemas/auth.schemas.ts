import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
    @Prop()
    UserId: String;

    @Prop()
    UserName: String;

    @Prop()
    UserAddress: string;

    @Prop()
    UserEmail: string;

    @Prop()
    UserContactNo: string;

    @Prop()
    UserPassword: string;

    @Prop()
    UserCreatedDate: Date;

    @Prop()
    UserUpdatedDate: Date;

    @Prop()
    Active: boolean;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);