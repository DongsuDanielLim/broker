import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express'

@Injectable()
/**
 * 사용자 정의 middleware는 NestMiddleware를 구현
 */
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...')
    next()
  }
}

/**
 * functional middleware example
 */
export function logger(req, res, next) {
  console.log('Request...')
  next()
}