import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext): User | any => {
    const request = ctx.switchToHttp().getRequest();
    
    const user = request.user as User | undefined;
    
    if (user) {
      if (data) {
        return user[data];
      }
      return user;
    }
    
    return null;
  },
);
