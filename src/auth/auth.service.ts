import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<User> {
    return this.userService.create({
      login: createAuthDto.login,
      password: createAuthDto.password,
    });
  }

  async login(createAuthDto: CreateAuthDto): Promise<Auth> {
    const user = await this.userService.findByLogin(createAuthDto.login);
    // if (user?.password !== createAuthDto.password) {
    //   throw new UnauthorizedException();
    // }
    const payload = { userId: user.id, login: user.login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY || 'secret123123',
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
