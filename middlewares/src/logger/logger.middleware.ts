import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// It uses this attribute to define a class as a provider that can be injected as a dependency
// When the middleware works for services, config, some logic or repositories, it should be a class-based middleware
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(['this is the middleware', req.method, req.originalUrl]);
//     next();
//   }
// }

/**
 * Can be converted to functional because it has no dependencies
 */
export function logger(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    console.log([
      'This is the functional middleware',
      `${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`,
    ]);
  });
  next();
}
