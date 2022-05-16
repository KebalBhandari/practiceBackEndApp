import {    ArgumentsHost,    Catch,    ExceptionFilter,    HttpException,    HttpStatus,  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
  
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      const statusCode = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

  
      const { message, error, msg, status }: any = exception.getResponse();
  
      response.status(statusCode).json({
        success: false,
        status: statusCode,
        error: error || message || status,
        msg: message || msg,
        method: request.method,
      });
    }
  }
  