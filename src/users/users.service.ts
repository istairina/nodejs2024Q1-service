import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from './interfaces/user-storage.interface';
import { User } from './entities/user.entity';
import InMemoryUsersStore from './store/user.storage';

@Injectable()
export class UsersService {
  private storage = new InMemoryUsersStore([]);

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  getAll() {
    return this.storage.getAll();
  }

  getById(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
