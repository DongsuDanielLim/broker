import {ExceptionFilter, Catch, HttpException, ArgumentsHost} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @param exception 
   * @param host ArgumentHost // utility object
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    // 원래 요청 핸들어 (예외가 발생하는 컨트롤러) 에 전달되는 Request, Response 오브젝트에 대한 참조를 얻는다
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    response
    .status(status)
    .json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}