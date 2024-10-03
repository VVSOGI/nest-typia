import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Typia test backend')
    .setDescription('Testing app using typia')
    .setVersion('1.0')
    .addTag('typia')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  /**
   * Swagger schemas UI 사용 안할 때.
   */
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(3000);
}
bootstrap();
