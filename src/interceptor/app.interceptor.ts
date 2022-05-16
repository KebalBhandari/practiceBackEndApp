import {CallHandler, ExecutionContext,Injectable,NestInterceptor} from '@nestjs/common';
  
  
  import { catchError, Observable, of, throwError } from 'rxjs';
  
  @Injectable()
  export class AppInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      console.log('im suers');
  
      let redisCache = true;
      if (redisCache) {
        return of([
          {
            id: 1,
            message: 'data from cache',
          },
        ]);
      }
  
      return next.handle();
    }
  }
  