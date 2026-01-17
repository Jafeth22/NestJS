import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: false, //
      inject: [ConfigService],
      // useFactory = calls a special function to return the module options
      // here we are getting the secret and expiration time from the config service
      useFactory: (configService: ConfigService) => ({
        // secret and signOptions are properties of JwtModuleOptions
        secret: configService.getOrThrow<string>("jwt.secret"),
        signOptions: {
          expiresIn: configService.getOrThrow<string>("jwt.expiresIn"),
        },
      }),
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
