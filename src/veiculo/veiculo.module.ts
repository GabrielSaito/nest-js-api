import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { Veiculo } from 'src/entities/veiculo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo])],
    providers: [VeiculoService],
    controllers: [VeiculoController],
    exports: [VeiculoService],  
})
export class VeiculoModule {}
