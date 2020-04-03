import { IsString, IsInt } from 'class-validator'

export class CreateIndividualityDto {
  @IsString() // class validator
  uuid: string
  
  @IsInt()
  channel: number
  
  @IsInt()
  platform: number

  @IsString()
  token: string

  @IsString()
  app_name: string

  @IsString()
  app_version: string
}