import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { idGEt } from 'src/common/dto/id.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'The user has been created', type: User })
  @ApiBadRequestResponse({
    description:
      'Bad request: some required fields are empty or it has wrong data',
  })
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Get list of all users' })
  @ApiOkResponse({
    description: 'Users have been got',
    type: User,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'Put a user id',
  })
  @ApiOkResponse({ description: 'User has been got', type: User })
  @ApiBadRequestResponse({ description: 'Bad request: userID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Get(':id')
  async findOne(@Param() { id }: idGEt): Promise<User> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @ApiOperation({ summary: 'Change password of the user' })
  @ApiParam({
    name: 'id',
    description: 'Put a user id',
  })
  @ApiOkResponse({ description: 'User has been updated', type: User })
  @ApiBadRequestResponse({ description: 'Bad request: userID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @ApiForbiddenResponse({ description: 'Forbidden: old password is wrong' })
  @Put(':id')
  async update(
    @Param() { id }: idGEt,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @ApiOperation({ summary: 'Delete the user' })
  @ApiParam({
    name: 'id',
    description: 'Put a user id',
  })
  @ApiNoContentResponse({ description: 'No content: user has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request: userID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: idGEt): Promise<any> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    await this.userService.remove(id);
  }
}
