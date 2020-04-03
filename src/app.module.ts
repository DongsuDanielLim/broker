import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { IndividualityController } from './individuality/individuality.controller';
import { IndividualityService } from './individuality/individuality.service';
import { IndividualityModule } from './individuality/individuality.module';
import { LoggerMiddleware, logger } from './common/middleware/logger.middleware';
import { Connection } from 'typeorm';

@Module({
  imports: [],
  controllers: [
    // AppController, 
    IndividualityController],
  providers: [
    // AppService, 
    IndividualityService], // provider registration
})

/**
   * Applying middleware
   * Module decorator에는 middleware를 위한 공간이 없음 (위에 @Module)
   * Middleware를 포함하는 Module은 NestModule을 구현해야함
   */
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  /**
   * AppModule 수준에서 LoggerMiddleware 설정
   * /individuality route handler에 대해 loggerMiddleware 설정
   * configure는 async await 로 사용할 수 있음
   * @param consumer 
   */
  configure(consumer: MiddlewareConsumer) {
    /**
     * Injectable class middleware
     */
    // consumer.apply(LoggerMiddleware)
    // .forRoutes('individuality')

    /**
     * functional middleware
     */
    consumer.apply(logger).forRoutes(IndividualityController)
    
    /**
     * forRoutes 아래 path와 method를 포함한 object를 통해 특정 path와 method에서 사용하도록 할 수 있음
     * controller class 도 사용 가능
     */
    // .forRoutes({path: 'individuality', method: RequestMethod.GET})
    // .forRoutes(IndividualityController)

    /**
     * exclude method로 middleware 사용을 배제시킬 수 있음
     */
    // .exclude(
    //   { path: 'indiciduality', method: RequestMethod.GET }
    //   { path: 'indiciduality', method: RequestMethod.POST }
    // ).forRoutes(IndividualityController)
  }
}
