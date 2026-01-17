import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // read Authorization header from request
    const request = context.switchToHttp().getRequest();

    const accessToken = request.cookies.access_token;

    if (!accessToken) {
      throw new UnauthorizedException("No access token");
    }

    // verify the JWT, return true if valid, false if invalid
    try {
      const secret = this.configService.getOrThrow<string>("jwt.secret");
      const payload = this.jwtService.verify(accessToken, { secret: secret });
    } catch (error) {
      console.log("JWT verification error:", error);
      throw new UnauthorizedException("Invalid token");
    }

    return true;
  }
}
