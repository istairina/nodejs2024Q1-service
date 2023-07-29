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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { id } from 'src/common/dto/id.dto';

@Controller('user')
export class UserController {
  // private usersService: UsersService;

  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  findOne(@Param() { id }: id) {
    if (!this.userService.getById(id))
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return this.userService.getById(id);
  }

  @Put(':id')
  update(@Param() { id }: id, @Body() updateUserDto: UpdateUserDto) {
    const user = this.userService.getById(id);
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: id) {
    const user = this.userService.getById(id);
    if (!user)
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    return this.userService.remove(id);
  }
}
