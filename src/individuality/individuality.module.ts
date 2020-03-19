import { Module, Global } from '@nestjs/common';
import { IndividualityController } from './individuality.controller'
import { IndividualityService } from './individuality.service'

/**
 * 모든 곳에서 동일한 모듈 셋을 가져오기 위해 전역에 정의, Provider는 module scope 캡슐화. 캡슐화 모듈을 가져오기 않으면 다른 곳에서 Provider 사용 불가능
 * root 또는 core module 에서 한번만 정의되어야 함
 * imports 배열을 사용할 필요 없음
 */
@Global()
// module과 관련된 모든 정의를 individuality directory로 이동시키고 root module 로 보냄
@Module({
  controllers: [IndividualityController],
  providers: [IndividualityService],
  /**
   * 다른 모듈 간 Service instance 공유를 위해서 Provider를 exports list 에 추가
   */
  exports: [IndividualityService]
})
export class IndividualityModule {
  /**
   * Cannot Dependency injection as Providers duo to circular dependency
   * 
   */
  // constructor(private individualityService: IndividualityService) {}
}
