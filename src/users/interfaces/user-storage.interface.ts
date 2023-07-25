import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

export interface UserStore {
  getAll: () => UserDto[];
  getById: (id: string) => UserDto | undefined;
  create: (params: CreateUserDto) => UserDto;
  update: (id: string, params: UpdateUserDto) => UserDto;
  delete: (id: string) => void;
}
