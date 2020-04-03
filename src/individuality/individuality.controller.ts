import { Controller, Get, Req, Res, Post, Header, Param, Put, Body, HttpStatus, HttpException, UseFilters, Catch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CreateIndividualityDto } from './dto/create-individuality.dto';
import { UpdateIndividualityDto } from './dto/update-individuality.dto'
import { IndividualityService } from './individuality.service'
import { Individuality } from './interface/individuality.interface'
import { Response } from 'express';
import { ForbiddenException } from './custom_errors/forbidden.exception';
import { HttpExceptionFilter } from './custom_errors/http-exception.filter';
// import { RolesGuard } from './guard/auth.guard'
import { Roles } from './decorator/roles.decorator';
import { LoggingInterceptor } from './interception/logging.interceptor';

@Controller('individuality')
// binding interceptor
@UseInterceptors(LoggingInterceptor)
// building guard. 단일 method 에 적용하려면 method 위에 @UseGuards decorator 쓰면 됨.
// @UseGuards(RolesGuard)
// 모든 exception을 잡으려면 argument 비워놓으면 됨
@Catch()
export class IndividualityController {
  // Dependency injection
  constructor(private individualityService: IndividualityService) {}

  @Post()
  /**
   * 사용자 지정 메타데이터 route handler에 사용자 정의 meta data를 첨부하는 기능 제공
   */
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  /**
   * binding exception filter. 
   * "," 로 나열할 수 있고 instance 대신 class 주입 가능
   * 가능한 class 로 주입하는 게 nest가 전체 모듈에서 동일한 class instance를 재사용해서 메모리 사용량이 줄어든다
   */
  @UseFilters(HttpExceptionFilter)
  /**
   * use pipe
   */
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // validation pipe는 하나의 지정된 매개변수에만 관련될 때 유용함
  @UsePipes(ValidationPipe)
  async create(@Body() CreateIndividualityDto: CreateIndividualityDto, @Res() res: Response) {
    // return 'create new mobile token'
    // return res.status(HttpStatus.CREATED).send()
    this.individualityService.create(CreateIndividualityDto)
    // use exception filter
    // throw new ForbiddenException()
  }

  @Get()
  // async getAll(@Req() request: Request, @Res() res: Response) {
  //   res.status(HttpStatus.OK).json([])
  // }
  async getAll(): Promise<Individuality[]> {
    // exception
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    // overwrite exception
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message'
    // }, HttpStatus.FORBIDDEN)
    // custom exception './custom_errors/forbidden.exception.ts'
    // throw new ForbiddenException // ./custom_errors/forbidden.exception.ts
    
    return this.individualityService.findAll()
  }

  @Put(':id')
  /**
   * use parse int pipe
   */
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateIndividuality: UpdateIndividualityDto) {
    return `Update token id is ${id}`
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number, params): string {
    return `return params is ${params.id}`
  }
}
