import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Cargo } from 'src/entities/cargo.entity';
import { CargoController } from './cargos.controller';
import { CargoService } from './cargos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])],
  providers: [CargoService],
  controllers: [CargoController],
  exports: [CargoService],
})
export class CargoModule {}
