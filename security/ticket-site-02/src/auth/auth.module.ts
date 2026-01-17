import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from '../users/roles.guard';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    global: false,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow<string>('jwt.secret'),
      signOptions: { expiresIn: configService.getOrThrow<string>('jwt.expiresIn') },
    })
  })],
  providers: [AuthService, RolesGuard],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
