import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUUID } from 'class-validator';

export class FindOneParams {
  @IsUUID(4)
  id: string;
}

@Controller('users')
export class UsersController {
  // private usersService: UsersService;

  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    if (!this.usersService.getById(id))
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return this.usersService.getById(id);
  }

  @Put(':id')
  update(@Param() { id }: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.getById(id);
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    const user = this.usersService.getById(id);
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return this.usersService.remove(id);
  }
}
