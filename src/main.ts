import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware';
import { HttpExceptionFilter } from './filter/exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter())

  // app.use(new LoggerMiddleware().use)
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      exceptionFactory(errors) {
        let errorMsg = "";
        errors.forEach((err) => {
          errorMsg += `${Object.values(err.constraints? err.constraints: "validation xatolik").join(",")},`
        });
        throw new BadRequestException(errorMsg);
      },
    })
  )

  const port = process.env?.APP_PORT? parseInt(process.env.APP_PORT, 10) : 3000
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
  });
}
bootstrap();
