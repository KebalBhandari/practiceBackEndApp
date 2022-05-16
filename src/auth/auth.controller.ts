import { Body, Controller, Get, HttpCode, HttpStatus, Next, ParseArrayPipe, Post, Query, Res, UseInterceptors,} from '@nestjs/common';
  import { ApiBadRequestResponse, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags,} from '@nestjs/swagger';
  import { NextFunction, Response } from 'express';
import { AppInterceptor } from 'src/interceptor/app.interceptor';
  import { UserService } from '../user/user.services';
  import { AuthService } from './auth.services';
  import { AuthLoginDto } from './dto/login-auth.dto';
  import { AuthSignUpDto } from './dto/signup-auth.dto';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}
  
    @ApiOperation({
      summary: 'This api is used for signup user',
    })

    @ApiCreatedResponse({
      description: 'Signup success',
    })

    @ApiConflictResponse({ 
      description: 'Conflict Response' 
    })

    @ApiBadRequestResponse({
      description: 'Bad Request',
    })

    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @Post('signup')
    async signup(@Body() authSignupDto: AuthSignUpDto,@Res() res: Response,@Next() next: NextFunction) 
    {
      try {    
        const user = await this.userService.userSignUp(authSignupDto);
        if (!user) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            status: 'Bad Request',
            msg: 'Unable To Create User !!!',
          });
        }
  
        const payload = {
          userId: user.UserUniqueId,
          role: user.UserRole,
        };
  
        const token = await this.authService.generateJwtToken(payload);
  
        return res.status(HttpStatus.CREATED).json({
          success: true,
          status: 'Created',
          msg: 'User Created successfully !!!',
          token,
        });
      } catch (error) {
        return next(error);
      }
    }
  
    @ApiOperation({
      summary: 'This api is used for login in to the system',
    })

    @ApiOkResponse({
      description: 'Login success',
    })

    @ApiBadRequestResponse({
      description: 'Bad Request',
    })


    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto,@Res() res: Response,@Next() next: NextFunction) {
      try {
        const user = await this.userService.userLogIn(authLoginDto);
        if (!user) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            status: 'Bad Request',
            msg: 'Sorry !! something went wrong unable to login',
          });
        }
        const payload = {
          userId: user.UserUniqueId,
          role: user.UserRole,
        };
  
        const token = await this.authService.generateJwtToken(payload);
  
        return res.status(HttpStatus.OK).json({
          success: true,
          status: 'Success',
          msg: 'User login successfully',
          token,
        });
      } catch (error) {
        return next(error);
      }
    }

  @UseInterceptors(AppInterceptor)
  @Get('post')
  postList(): object {
    console.log('api call');
    return {
      data: 'Post list',
    };
  }


  @Post('post/:id')
  @HttpCode(404)
  detailById(
    @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
    id: number[],
  ): string {
    return 'list user' + id;
  }
}