import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.services";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: object): Promise<string> {
    return this.jwtService.sign(payload, {
      issuer: process.env.JWT_ISSUER,
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRES,
    });
  }

  async validateJwtUser(payload: object) {
    return await this.userService.findByPayload(payload);
  }
}