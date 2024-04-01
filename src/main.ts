import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('NodeJS: Home Library Service')
    .setDescription(`Endpoints according to First weeks of the task`)
    .setVersion('1.0')
    .build();

  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT') || 4000;
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
    console.log(`OpenAPI doc is available http://localhost:${PORT}/doc`);
  });
}
bootstrap();
