import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Backend-test API DOCS')
  .setDescription('The Backend-test API description')
  .setVersion('1.0')
  .addTag('Backend_Test')
  .addBearerAuth({
    type:"http",
    scheme:"bearer",
    bearerFormat:"JWT",
    name:"JWT",
    description:"Enter JWT Token",
    in:"header"
  },"JWT-auth")
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
let port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`${ await app.getUrl()}`)
}
bootstrap();