import { Cargo } from './../entities/cargo.entity';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CargoService } from './cargos.service';
 
@Controller('cargos')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Get()
  async findAll(): Promise<Cargo[]> {
    return this.cargoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Cargo> {
    return this.cargoService.findById(id);
  }

  @Post()
  async create(@Body() cargoData: Partial<Cargo>): Promise<Cargo> {
    return this.cargoService.create(cargoData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() cargoData: Partial<Cargo>): Promise<Cargo> {
    return this.cargoService.update(id, cargoData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.cargoService.delete(id);
  }
}
