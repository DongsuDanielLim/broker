import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './individuality/custom_errors/http-exception.filter';
// import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /**
   * Global middleware
   */
  // app.use(logger)

  /**
   * Global scope exception filter
   */
  // app.useGlobalFilters(new HttpExceptionFilter)

  await app.listen(3000);
}
bootstrap();
