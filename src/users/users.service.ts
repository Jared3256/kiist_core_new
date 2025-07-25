import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User1Schema } from './user.schema';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User1Schema.name)
    private userModel: mongoose.Model<User1Schema>,
  ) {}

  private readonly logger = new Logger(UsersService.name);
  private users = [
    {
      id: 1,
      name: 'Jared Odhiambo',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Jackson',
      role: 'Admin',
    },
    {
      id: 3,
      name: 'Jane Atieno',
      role: 'Intern',
    },
    {
      id: 4,
      name: 'Kelvin Ochieng',
      role: 'Intern',
    },
  ];

  /**
   * @name GetAllUsers
   * @description This method return all the users
   */
  async getAllUser(): Promise<User1Schema[]> {
    const myusers = await this.userModel.find();
    if (!myusers.length) {
      throw new NotFoundException({
        success: false,
        message: 'No user found',
        status: 400,
      });
    }
    return myusers;
  }

  /**
   *
   * @param id
   */
  async getUserById(id: string) {
    try {
      if (id.length !== 24) {
        this.logger.error('Invalid ID provided ' + id);
        throw new PreconditionFailedException({
          message: 'Invalid ID provided ',
          success: false,
        });
      }
      const myUser = await this.userModel.findById(id);

      if (!myUser) {
        throw new NotFoundException({
          message: `User with id ${id} not found!`,
          statusCode: 404,
          success: false,
        });
      }

      return myUser;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Create user with the provided details
   */
  async createNewUser(createUserDto: CreateUserDto): Promise<User1Schema> {
    try {
      const foundUser = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (foundUser) {
        throw new ConflictException({
          message: 'Email is already registered',
          success: false,
        });
      }
      const result = await this.userModel.create(createUserDto);

      if (!result) {
        throw new UnprocessableEntityException({
          message: 'Unable to create user',
          success: false,
        });
      }

      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
