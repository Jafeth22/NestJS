import { Controller, Get, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { RolesGuard } from '../users/roles.guard';
import { Role } from '../users/role.enum';
import { Roles } from '../users/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const accessToken = await this.authService.login(loginDto.email, loginDto.plaintextPassword);
    response.cookie('access_token', accessToken.access_token, {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    }).send()
  }

  @Get('logout')
  logout(@Res() response: Response) {
    return response.clearCookie('access_token', 
      {
        secure: false,
        httpOnly: true,
        maxAge: 0
      }
    ).send();
  }

  @Get('user-route')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
  getUserRoute() {
    return { message: 'User-only route request successful'}
  }

  @Get('admin-route')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAdminRoute() {
    return { message: 'Admin-only route request successful'}
  }

}
