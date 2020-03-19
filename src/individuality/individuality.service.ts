import { Injectable } from '@nestjs/common';
import { Individuality } from './interface/individuality.interface'

@Injectable()
export class IndividualityService {
  private readonly individualities: Individuality[] = []

  create(individuality: Individuality) {
    this.individualities.push(individuality)
  }

  findAll(): Individuality[] {
    return this.individualities
  }
}
