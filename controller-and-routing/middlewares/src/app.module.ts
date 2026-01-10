import {
  /*MiddlewareConsumer,*/ Module /*, NestModule*/,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
/**
 * AppModule class that configures the LoggerMiddleware for all routes
 * NestModule interface is implemented to gain access to the configure method
 */
// export class AppModule implements NestModule {
//   // The configure method is used to apply middleware to routes
//   // MiddlewareConsumer automatically passes a helper class 'MiddlewareConsumer' to the configure method
//   configure(consumer: MiddlewareConsumer) {
//     // Here, LoggerMiddleware is applied to all routes using forRoutes('*')
//     consumer
//       .apply(LoggerMiddleware) // apply method is used to specify which middleware to use, it allows multiple middleware to be applied
//       // .exclude() // exclude method is used to specify routes that should be excluded from the middleware
//       .forRoutes('*'); // forRoutes method is used to specify the routes the middleware should apply to
//     // also, specific routes can be defined like { path: 'cats', method: RequestMethod.GET
//     // also, pass controllers instead of paths, or, mix both
//   }
// }
export class AppModule {}
