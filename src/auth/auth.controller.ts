import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/sighup')
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('/refresh')
  // refresh(@Body() signInDto: Record<string, any>) {
  //   return this.authService.refresh(signInDto.username, signInDto.password);
  // }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
