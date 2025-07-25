import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'SHAN-INFO-SYSTEMS',
    }),
  });

  /**
   * Configure HTTP Cookie for the application
   */
  // app.use(cookieParser('SHAN_DYNAMIC_SYSTENS'));

  // Every controller route now starts with /api/v1
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('New Kiist Example')
    .setDescription('This is a description of the API')
    .setVersion('1.0')
    .addTag('Kiist')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, documentFactory);

  /**
   * Enable URI versioning
   */
  app.enableVersioning({
    type: VersioningType.URI,
    type: VersioningType.HEADER,
    header: 'Shan-Dynamic Systems',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
