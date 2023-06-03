import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// ctx = context
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // Here is going to return the value of the param that is decorated
    // It gets the request body
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
