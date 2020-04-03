import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * 모든 guard 는 canActivate를 구현해야 함 
   * @param context 
   * @returns {boolean} true : 요청 처리, false : 요청 거부
   * 단일 인수 ExecutionContext 인스턴스 사용. ExecutionContext는 ArgumentsHost에서 상속
   * ExcutionContext : 현재 실행 프로세스에 대한 추가 세부정보를 제공하는 helper method 추가. controller, method 등 에서 작동할 수 있음.
   */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return true
    // return validateRequest(request)
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true
  }
}