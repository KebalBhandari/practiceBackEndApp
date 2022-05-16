import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PostsModule } from './posts/posts.module';
import { AuthMiddleware } from './middleware/auth';
import { Auth2Middleware } from './middleware/auth2';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    }),
    AuthModule, 
    UserModule, 
    BookmarkModule, PostsModule
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, Auth2Middleware)
      .exclude({
        path: 'auth/login',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: 'auth/post',
        method: RequestMethod.GET,
      });
  }
}

