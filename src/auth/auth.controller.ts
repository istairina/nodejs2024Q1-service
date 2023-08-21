import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Auth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() signInDto: Auth) {
    return this.authService.login(signInDto.login, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/sighup')
  signUp(@Body() signInDto: Auth) {
    return this.authService.signUp(signInDto.login, signInDto.password);
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
