import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    plaintextPassword: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      plaintextPassword,
      user.encodedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = {
      email: user.email,
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
    };
    const access_token = this.jwtService.sign(payload);
    console.log("Generated JWT:", access_token);

    return {
      access_token: access_token,
    };
  }
}
