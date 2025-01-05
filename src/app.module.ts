import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TasksModule, 
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule
  ],
  controllers: [UserController]
})
export class AppModule {}