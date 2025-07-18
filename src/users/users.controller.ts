import { Controller, Get, Param } from '@nestjs/common';

@Controller('users') //PATH api/v1/users
export class UsersController {
  /*
   * POST /users
   * PUT /users/:id
   * DELETE /users/:id
   */

  @Get() // GET /api/v1/users
  getAllUsers(): string[] {
    return ['Jared', 'Odhiambo', 'Owit'];
  }

  @Get(':id') // GET /api/v1/users/:id
  getUserById(@Param('id') id: number) {
    return {
      id: id,
      name: 'Jared',
    };
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
}
