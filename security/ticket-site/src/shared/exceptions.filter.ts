import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = exception.message;
    } else if (
      exception instanceof Error &&
      exception.message.includes("invalid csrf token")
    ) {
      httpStatus = HttpStatus.FORBIDDEN;
      message = "Invalid CSRF token";
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: message,
    };

    console.error(
      `[Global Exception Filter] Status: ${httpStatus}, Message: ${message}`
    );

    if (exception instanceof Error) {
      console.error("Stack trace:", exception.stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
