import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Render,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { AuthGuard } from "./auth.guard";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("login")
  @Render("login")
  getLoginPage() {
    return {
      title: "Login",
    };
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.plaintextPassword,
    );
    return response
      .cookie("access_token", accessToken.access_token, {
        secure: false, // it means that the cookie will be sent over HTTP, set to true in production
        // it means that the cookie cannot be accessed via JavaScript, it helps to prevent XSS attacks
        // it can be accessed via JavaScript if needed, when it is true, is not accessible and
        // can only be sent via HTTP requests
        httpOnly: false,
        maxAge: 60 * 60 * 1000,
      })
      .send();
  }

  @Get("logout")
  logout(@Res() response: Response) {
    return response
      .clearCookie("access_token", {
        secure: false,
        httpOnly: false,
        maxAge: 0,
      })
      .send();
  }

  // UseGuards = decorator that applies a guard to the route
  @UseGuards(AuthGuard)
  @Get("test")
  test() {
    return { message: "Protected route request successful." };
  }
}
