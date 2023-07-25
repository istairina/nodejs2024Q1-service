import { Injectable } from '@nestjs/common';
import { UserStore } from '../interfaces/user-storage.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
class InMemoryUsersStore implements UserStore {
  private usersDb: UserDto[];

  constructor(users: UserDto[]) {
    this.usersDb = users;
  }

  findAll: () => UserDto[];

  findOne: (id: string) => UserDto;

  getAll = (): UserDto[] => this.usersDb;

  getById = (id: string): UserDto =>
    this.usersDb.find((user) => user.id === id);

  delete = (id: string): void => {
    this.usersDb.filter((user) => user.id !== id);
  };

  create = (params: CreateUserDto): UserDto => {
    const newUser = { ...params, id: uuid() };
    this.usersDb.push(newUser);
    return newUser;
  };

  update = (id: string, params: UpdateUserDto): UserDto => {
    Object.assign(this.getById(id), params);
    return this.getById(id);
  };
}

export default InMemoryUsersStore;
