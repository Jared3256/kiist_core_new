import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User1Schema } from './user.schema';

@Controller('users') //PATH api/v1/users
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  /*
   * POST /users
   * PUT /users/:id
   * DELETE /users/:id
   */

  @Get() // GET /api/v1/users
  async getAllUsers(): Promise<User1Schema[]> {
    return this.userService.getAllUser();
  }

  @Get(':id') // GET /api/v1/users/:id
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  /**
   * @path /api/v1/users/interns
   * @method GET
   * @scope PUBLIC
   * @description This API return all the intens available in the database
   */
  @Get('interns') // GET
  getAllInterns(): object[] {
    return [
      {
        id: 1,
        name: 'Jared',
        role: 'Intern',
      },
    ];
  }

  /**
   * @path /api/v1/users/create
   * @method POST
   * @scope PUBLIC
   * @description This API creates a new user in the database
   * @returns created user Object
   */
  @Post('create')
  async createNewUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User1Schema> {
    return this.userService.createNewUser(createUserDto);
  }

  /**
   * @path /api/v1/users/:id/update
   * @method PUT
   * @scope PUBLIC
   * @description This API update the user in the database
   * @returns Updated user object
   */
  @Put(':id/update')
  updateUser(@Body(ValidationPipe) user: UpdateUserDto) {
    return {
      ...user,
      'modified user': true,
    };
  }

  /**
   * @path /api/v1/users/:id/update
   * @method DELETE
   * @scope PUBLIC
   * @description This API deletes the user with the provided id
   * @returns Updated user object
   */
  @Delete(':id/remove')
  removeUserById(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
