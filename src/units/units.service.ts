import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Unit } from './model/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitsRepository: Repository<Unit>
  ){}
  getAllUnits() {
    return this.unitsRepository.find()
  }

  getSingleUnit(id: number) {
    return this.unitsRepository.findOne(id)
  }
  create(name: string) {
    return this.unitsRepository.save({
      name
    })
  }
}
