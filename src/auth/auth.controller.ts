import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './public.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Auth } from './entities/auth.entity';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful signup',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad reuqest',
  })
  @ApiForbiddenResponse({ description: 'It is forbidden' })
  @Post('signup')
  @Public()
  signup(@Body() signUpDto: CreateAuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad reuqest',
  })
  @ApiForbiddenResponse({ description: 'It is forbidden' })
  @Post('login')
  @Public()
  login(@Body() loginDto: CreateAuthDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @UseGuards(AuthGuard)
  @Public()
  async refresh(@Body() refreshDto: RefreshDto): Promise<Auth> {
    return await this.authService.refresh(refreshDto);
  }
}
