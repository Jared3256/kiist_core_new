import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Cron('10 * * * * *', {
    name: '10th Second',
  })
  handleCron1() {
    this.logger.debug('Called when the current second is 10');
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: '30s CRON',
  })
  handleCron() {
    this.logger.debug('Called every 30 seconds');
  }

  getHello(): string {
    return 'Hello World from NestJS APIs!';
  }

  getAnotherHello(): object {
    const names = {
      message: 'Success from another api',
      success: true,
      data: null,
    };
    return names;
  }
}
