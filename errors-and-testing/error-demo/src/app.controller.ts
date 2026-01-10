import {
  Controller,
  Get,
  GoneException,
  // HttpException,
  // HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './exceptions/custom-exception.filter';

@Controller()
// @UseFilters(CustomExceptionFilter) // Here, we can apply the filter to all routes in this controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(CustomExceptionFilter) // Applying the custom exception filter to this route
  getHello(): string {
    // throw new HttpException(
    //   {
    //     message: 'Custom error message',
    //     error: 'Gone',
    //     statusCode: HttpStatus.GONE,
    //   },
    //   HttpStatus.GONE,
    // );
    // Above code is the same as below line, we can use other, just go to official docs
    throw new GoneException('This resource is no longer available.');
    // throw new CustomExceptionFilter('No longer available!!!');
    return this.appService.getHello();
  }
}
