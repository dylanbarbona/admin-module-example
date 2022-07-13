import {NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RequestMethod, ValidationPipe, VersioningType } from "@nestjs/common";
import { PrismaService } from "./database/prisma.service";

const cookieParser = require('cookie-parser');
const morgan = require('morgan');

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api',
      {
        exclude: [{ path: '/', method: RequestMethod.GET }],
      }
  );
  app.use(morgan('dev'));
  app.use(cookieParser());

  const config = new DocumentBuilder()
      .setTitle('Commercial Admin API')
      .setDescription('Commercial Admin API')
      .setVersion(String(process.env.API_VERSION || 1.0))
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  await app.listen(process.env.PORT || 3000, () => console.debug('Listening on port ' + (process.env.PORT || 3000)));

  await repl(AppModule);
})()
