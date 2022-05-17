import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthLoginDto } from "src/auth/dto/login-auth.dto";
import { AuthSignUpDto } from "src/auth/dto/signup-auth.dto";
import * as uuid from 'uuid';
import { IUser } from "./interfaces/user.interface";
import { User } from "./schemas/user.schema";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  #sanitizeUser(user: IUser) {
    return user.getUserInfo();
  }

  async userSignUp(userSignupDto: AuthSignUpDto): Promise<IUser> {
    try {
      
      let query: object = { UserEmail: userSignupDto.UserEmail};
      let userCheck = await this.userModel.findOne(query);
      
      if (userCheck) {
        throw new HttpException(
          {
            success: false,
            status: 'Error',
            msg: 'Email already registered !!!',
          },
          HttpStatus.CONFLICT,
        );
      }
      else
      {
      const createUser = new this.userModel(userSignupDto);
      createUser.UserUniqueId = createUser.UserCreatedBy = uuid.v4();
      await createUser.save();
      return this.#sanitizeUser(createUser);
      }
    } catch (error) {
      throw error;
    }
  }

  async userLogIn(userLoginDto: AuthLoginDto): Promise<IUser> {
    try {
      const query: object = {
        $or: [
          { UserEmail: userLoginDto.UserEmail },
          { UserPassword: userLoginDto.UserPassword },
        ],
        Active: true,
      };

      const user = await this.userModel.findOne(query);
      if (!user) {
        throw new HttpException(
          {
            success: false,
            status: 'Error',
            msg: 'Sorry !!! Invalid Credentials',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const passMatched = await user.verifyPassword(userLoginDto.UserPassword);
      if (!passMatched) {
        throw new HttpException(
          {
            success: false,
            status: 'Bad Request',
            msg: 'Sorry !!! Invalid Credentials',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return this.#sanitizeUser(user);
    } catch (error) {
      throw error;
    }
  }

  async findByPayload(payload: any) {
    return await this.userModel
      .findOne({ uniqueId: payload.userId })
      .select('-password -uniqueId');
  }

  async getUserProfile(user: IUser): Promise<IUser> {
    try {
      if (!user) {
        throw new HttpException(
          {
            success: false,
            status: 'Not Found',
            msg: 'Sorry !!! User record not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}