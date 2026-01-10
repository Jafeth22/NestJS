/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { delay, Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  /**
   * ExecutionContext provides details about the current request being handled.
   * CallHandler allows the interceptor to pass control to the next handler in the chain.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      delay(500),
      // tap = side-effect operator that allows us to perform actions without altering the stream
      tap(() => {
        const duration = Date.now() - now;
        response.setHeader('X-Response-Time', `${duration}ms`);
        console.log(
          `Handled: ${request.method} - ${request.url} in ${duration}ms`,
        );
      }),
    );
  }
}
