import { Injectable } from '@nestjs/common';
import { UserStore } from '../interfaces/user-storage.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
class InMemoryUserStore implements UserStore {
  private usersDb: UserDto[];

  constructor(users: UserDto[]) {
    this.usersDb = users;
  }

  getAll = (): UserDto[] => this.usersDb;

  getById = (id: string): UserDto =>
    this.usersDb.find((user) => user.id === id);

  delete = (id: string): void => {
    const userIndex = this.usersDb.findIndex((user) => user.id === id);
    this.usersDb.splice(userIndex, 1);
  };

  create = (params: CreateUserDto): UserDto => {
    const newUser = {
      id: uuid(),
      login: params.login,
      password: params.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.usersDb.push(newUser);
    return newUser;
  };

  update = (id: string, params: UpdateUserDto): UserDto => {
    const newData = {
      password: params.newPassword,
      updatedAt: Date.now(),
      version: this.getById(id).version + 1,
    };
    Object.assign(this.getById(id), newData);
    return this.getById(id);
  };
}

export default InMemoryUserStore;
