import { IsString } from 'class-validator'

export class CreateUnitDTO {
  @IsString()
  name: string
}