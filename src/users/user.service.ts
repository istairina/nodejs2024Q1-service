import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    const newUser = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const createdUser = this.usersRepository.create(newUser);
    return this.usersRepository.save(createdUser);
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
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
    await this.usersRepository.update(id, newUser);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    await this.usersRepository.delete(id);
  }
}
