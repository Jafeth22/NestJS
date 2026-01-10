import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // Catches all exceptions, we can indicate which ones to catch by passing them as arguments
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  /**
   * @param exception it is Error type because we are catching all exceptions
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const { message } = exception;
    const [status, name] =
      exception instanceof HttpException
        ? [exception.getStatus(), exception.name]
        : [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error'];

    this.logger.error(
      `${request.method} ${request.originalUrl} - ${status} ${message}`,
    );

    response.status(status).json({
      message,
      path: request.originalUrl,
      timestamp: new Date().toLocaleTimeString(),
      error: name,
      statusCode: status,
    });
  }
}
