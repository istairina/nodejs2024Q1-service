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
      login: login,
      password: password,
    };

    const createdUser = this.usersRepository.create(newUser);
    const updatedUser = await this.usersRepository.save(createdUser);
    return this.usersRepository.findOne({ where: { id: updatedUser.id } });
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
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['password'],
    });

    if (!user)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    if (user.password !== oldPassword)
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );

    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: newPassword })
      .where('id = :id', { id: id })
      .execute();

    return await this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    await this.usersRepository.delete(id);
  }
}
