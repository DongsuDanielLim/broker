import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before...')

    const now  = Date.now()

    /**
     * handle()은 RxJS Observable 을 반환
     * stream을 조작하는데 사용할 수 있는 다양한 연산자 선택 가능
     * tap()을 사용하여 관찰 가능 stream이 정상적으로 종료되거나 예외적으로 종료될 때 익명 로깅 함수를 호출
     */
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`))
    )
  }
}