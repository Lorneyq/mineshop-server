import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'iriU4/ Zn*FlzG>_LMelO4hY4oBU4J=!',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3001',
      'https://mineshop.up.railway.app',
      'https://mineshop.vercel.app',
      'https://mineshop-client-lorneyq.vercel.app',
      'https://mineshop-client-git-main-lorneyq.vercel.app',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Mineshop')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.port || 3000);
}
bootstrap();
