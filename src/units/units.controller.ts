import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDTO } from './dto/create-unit.dto';
import { Roles } from '../token-validator/decorators/Roles';
import { Authenthicated } from 'src/token-validator/decorators/Authorized';

@Controller('units')
export class UnitsController {
  constructor(
    private readonly unitsService: UnitsService  ) {}
  @Get('/')
  getAllUnits() {
    return this.unitsService.getAllUnits()
  }

  @Post('/')
  @Authenthicated()
  @Roles('user', 'admin')
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createUnitDTO: CreateUnitDTO) {
    return this.unitsService.create(createUnitDTO.name)
  }

  @Get('/:id')
  getSingleUnit(@Param('id') id: number) {
    return this.unitsService.getSingleUnit(id)
  }
}
