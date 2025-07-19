import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User1Schema, User1Schemaa } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User1Schema.name,
        schema: User1Schemaa,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
