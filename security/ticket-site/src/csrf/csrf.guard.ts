import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import * as csurf from "csurf";

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly csrf;

  constructor() {
    this.csrf = csurf({ cookie: true });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (["GET", "HEAD", "OPTIONS"].includes(request.method)) {
      return true;
    }
    try {
      await new Promise<void>((resolve, reject) => {
        this.csrf(request, response, (error) => {
          if (error) {
            console.error("CSRF validation error:", error);
            reject(new ForbiddenException("Invalid CSRF token"));
          } else {
            resolve();
          }
        });
      });

      return true;
    } catch (error) {
      console.error("CSRF validation failed:", error.message);
      throw error;
    }
  }
}
