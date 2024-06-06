import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module'
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { PosController } from './pos/pos.controller';

@Module({
  imports: [AuthModule, UserModule, PostModule, CategoryModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
  controllers: [PosController]
})
export class AppModule {}