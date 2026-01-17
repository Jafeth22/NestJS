import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomBytes } from 'crypto';

@Injectable()
export class NonceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const nonce = randomBytes(16).toString('hex');
    res.locals.nonce = nonce;
    next();
  }
}