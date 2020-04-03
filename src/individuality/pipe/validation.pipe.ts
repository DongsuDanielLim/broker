import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  /**
   * 모든 pipe는 transform() method 를 제공해야 함
   * @param value 현재 처리 value (before it is received by the route handling method)
   * @param metadata 
   * @param metatype meta type argument로 추출하기 위한 destructuring 
   */
  async transform(value: any, {metatype}: ArgumentMetadata){
    // toValidate() 처리중인 현재 인수가 기본 js 유형인 경우 validate 생략
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    // 일반 js 인수 객체를 유형이 지정된 객체로 변환하여 유효성 검사
    const object = plainToClass(metatype, value)
    const errors = await validate(object)

    // 유효성 검사 파이프는 값을 변경하지 않거나 exception throw
    if (errors.length > 0) {
      throw new BadRequestException('Validation faild')
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}

/**
 * ArgumentMetadata 의 속성
 * @param type argument가 body, query, param, 등 여부를 나타냄
 * @param metatype argument의 meta type (string 같은)
 * @param data decorator 에 전달된 문자열 @Body('string') decorator 괄호를 비워두면 정의되지 않음
 */
// export interface ArgumentMetadata {
//   type: 'body' | 'query' | 'param' | 'custom';
//   metatype?: Type<unknown>;
//   data?: string;
// }

// @Injectable()
// export class JoiValidationPipe implements PipeTransform {
//   constructor(private schema: Object) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     const { error } = this.schema.validate(value)
//     if (error) {
//       throw new BadRequestException('Validation faild')
//     }
//     return value
//   }
// }
