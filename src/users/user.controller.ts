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
  HttpCode,
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get list of all users' })
  @ApiOkResponse({
    description: 'Users have been got',
    type: User,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({ description: 'User has been got', type: User })
  @ApiBadRequestResponse({ description: 'Bad request: userID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    if (!this.userService.getById(id))
      throw new HttpException("User don't found", HttpStatus.NOT_FOUND);
    const response = this.userService.getById(id);
    delete response['password'];
    return response;
  }

  @ApiOperation({ summary: 'Change password of the user' })
  @ApiOkResponse({ description: 'User has been updated', type: User })
  @ApiBadRequestResponse({ description: 'Bad request: userID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @ApiForbiddenResponse({ description: 'Forbidden: old password is wrong' })
  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete the user' })
  @ApiNoContentResponse({ description: 'No content: user has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request: userID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: idGEt) {
    return this.userService.remove(id);
  }
}
