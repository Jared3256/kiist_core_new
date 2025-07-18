import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from NestJS APIs!';
  }

  getAnotherHello(): object {
    const names = {
      message:"Success from another api",
      success:true,
      data :null
    };
    return names;
  }
}
