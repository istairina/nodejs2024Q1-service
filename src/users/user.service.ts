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

    // const createdUser = this.usersRepository.create(newUser);
    // console.log('createdUser', createdUser);
    await this.usersRepository.save(newUser);
    // console.log('updatedUser', updatedUser);
    // console.log(
    //   'this.usersRepository.findOne({ where: { id: updatedUser.id } });',
    //   await this.usersRepository.findOne({ where: { id: updatedUser.id } }),
    // );
    return this.usersRepository.findOne({ where: { id: newUser.id } });
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return await this.usersRepository.findOne({ where: { id } });
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

      // await this.usersRepository
      //   .createQueryBuilder()
      //   .update(User)
      //   .set({ password: newPassword })
      //   .set({ updatedAt: Date.now() })
      //   .where('id = :id', { id: id })
      //   .execute();
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
}
