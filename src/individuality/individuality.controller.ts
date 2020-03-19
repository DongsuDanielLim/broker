import { Controller, Get, Req, Res, Post, Header, Param, Put, Body, HttpStatus } from '@nestjs/common';
import { CreateIndividualityDto } from './dto/create-individuality.dto';
import { UpdateIndividualityDto } from './dto/update-individuality.dto'
import { IndividualityService } from './individuality.service'
import { Individuality } from './interface/individuality.interface'
import { Response } from 'express';

@Controller('individuality')
export class IndividualityController {
  // Dependency injection
  constructor(private individualityService: IndividualityService) {}

  @Post()
  async create(@Body() createIndividuality: CreateIndividualityDto, @Res() res: Response) {
    // return 'create new mobile token'
    // return res.status(HttpStatus.CREATED).send()
    this.individualityService.create(createIndividuality)
  }

  @Get()
  // async getAll(@Req() request: Request, @Res() res: Response) {
  //   res.status(HttpStatus.OK).json([])
  // }
  async getAll(): Promise<Individuality[]> {
    return this.individualityService.findAll()
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateIndividuality: UpdateIndividualityDto) {
    return `Update token id is ${id}`
  }

  @Get(':id')
  getOne(@Param() params): string {
    return `return params is ${params.id}`
  }
}
