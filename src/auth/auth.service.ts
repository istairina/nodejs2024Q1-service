import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByName(username);
    if (user) {
      throw new UnauthorizedException();
    }
    const ready = await this.userService.create({
      login: username,
      password: pass,
    });
    console.log('ready', ready);
    // const payload = { sub: user.id, username: user.login };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // async refresh() {}
}
