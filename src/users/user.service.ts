import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  create({ login, password }: CreateUserDto) {
    const newUser = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const response = this.databaseService.users.create(newUser);
    delete response['password'];
    return response;
  }

  getAll() {
    const response: UserDto[] = this.databaseService.users.getAll();

    return response.map((item) => {
      delete item.password;
      return item;
    });
  }

  getById(id: string) {
    const response = this.databaseService.users.getById(id);
    delete response['password'];
    return response;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const user = this.getById(id);
    if (!user)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    if (user.password !== oldPassword)
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    const newUser = {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
    const response = this.databaseService.users.update(id, newUser);
    delete response['password'];
    return response;
  }

  remove(id: string) {
    const user = this.getById(id);
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return this.databaseService.users.delete(id);
  }
}
