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
    if (typeof password !== 'string' || typeof login !== 'string') {
      throw new HttpException(
        'Invalid login or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      id: uuid(),
      login: login,
      version: 1,
      password: password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await this.usersRepository.save(newUser);

    return this.usersRepository.findOne({ where: { id: newUser.id } });
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return user;
  }

  async getByName(login: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user) return null;
    return user;
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<User> {
    if (typeof newPassword !== 'string') {
      throw new HttpException('Invalid new password', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['password', 'login', 'createdAt'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password === oldPassword) {
      user.id = id;
      user.password = newPassword;
      user.updatedAt = Date.now();
      await this.usersRepository.save(user);

      return await this.usersRepository.findOne({ where: { id } });
    } else
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    await this.usersRepository.delete(id);
  }

  async findByLogin(login: string) {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return user;
  }
}
