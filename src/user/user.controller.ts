const { Controller } = require('@nestjs/common');
import { UserService } from "./user.services";
import {ApiTags  } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
