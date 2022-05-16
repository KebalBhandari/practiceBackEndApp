import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { NextFunction } from "express";
import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';


type UserDocument = User & mongoose.Document;
@Schema()
export class User {
  @Prop({type: String,trim: true})
  UserName: string;

  @Prop({type: String,trim: true,minlength: 8,required: true})
  UserPassword: string;

  @Prop({type: String,trim: true,minlength: 7,required: true,unique: true})
  UserEmail: string;

  @Prop({type: String,trim: true,minlength: 10,maxlength: 10,required: true})
  UserContactNo: string;

  @Prop({ type: String, trim: true, required: true, unique: true })
  UserUniqueId: string;

  @Prop({ type: String, trim: true })
  UserImageURL: string;

  @Prop({ type: [String], trim: true, required: true, default: ['user'] })
  UserRole: string[];

  @Prop({ type: String, trim: true, minlength: 5, required: true})
  UserAddress: string;

  @Prop({ type: Boolean, default: true })
  UserTermsAndCondition: boolean;

  @Prop({ type: Date, required: true, default: new Date() })
  UserCreatedDate: Date;

  @Prop({ type: String, required: true })
  UserCreatedBy: string;

  @Prop({ type: Date, default: new Date() })
  UserUpdatedDate: Date;

  @Prop({ type: String})
  UserUpdatedBy: string;

  @Prop({ type: Boolean, default: true })
  Active: boolean;

  getUserInfo: Function;
  verifyPassword: Function;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: UserDocument, next: NextFunction) {
  let user = this;
  if (!user.isModified('UserPassword')) 
  return next();
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
  const hashPassword = await bcrypt.hash(user.UserPassword, salt);
  user.UserPassword = hashPassword;
  next();
});

UserSchema.pre('save', async function (this: UserDocument, next: NextFunction) {
  let user = this;
  if (!user.isModified('UserName'))
  return next();
});

UserSchema.methods.getUserInfo = function (this: UserDocument): object {
  const user = this;
  const userObject = user.toObject();
  delete userObject.UserPassword;
  return userObject;
};

UserSchema.methods.verifyPassword = async function (this: UserDocument,userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.UserPassword);
};

export { UserSchema };
