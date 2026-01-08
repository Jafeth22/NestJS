import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const { message, name } = exception;

    response.status(status).json({
      message,
      path: request.originalUrl,
      timestamp: new Date().toLocaleTimeString(),
      error: name,
      statusCode: status,
    });
  }
}
