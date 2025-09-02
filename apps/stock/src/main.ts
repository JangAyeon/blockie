import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { ClassValidatorException } from './utils/class-validator-exeption';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    req.headers['content-type'] = 'application/json';
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      exceptionFactory: (errors) => new ClassValidatorException(errors),
    }),
  );

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KIS Stock API')
    .setDescription(`BLOCKIE 한국투자 API 서버 문서입니다.`)
    .setVersion('1.0')
    .addBearerAuth(
      // ✅ JWT 토큰 설정
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token', // 이 이름을 아래 @ApiBearerAuth()에 맞춰줘야 함
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const theme = new SwaggerTheme();
  const options = {
    explorer: false,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  };
  // 환경변수 확인 (개발 단계에서만)
  if (process.env.NODE_ENV !== 'production') {
    console.log('Environment check:');
    console.log('KIS_APP_KEY exists:', process.env.KIS_APP_KEY);
    console.log('KIS_APP_SECRET exists:', process.env.KIS_APP_SECRET);
    console.log('KIS_APPROVAL_KEY exists:', process.env.KIS_APPROVAL_KEY);
  }
  SwaggerModule.setup(`api`, app, document, options);
  const PORT = process.env.PORT ?? 3031;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}/api`);
}
bootstrap();
