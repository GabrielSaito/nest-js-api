import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
 import { Veiculo } from 'src/entities/veiculo.entity';
import { VeiculoService } from './veiculo.service';

@Controller('veiculos')
export class VeiculoController {
    constructor(private readonly veiculoService: VeiculoService) {}

    @Post()
    async criarVeiculo(@Body() veiculoData: Partial<Veiculo>): Promise<Veiculo> {
        return this.veiculoService.criarVeiculo(veiculoData);
    }

    @Get()
    async obterTodosVeiculos(): Promise<Veiculo[]> {
        return this.veiculoService.obterTodosVeiculos();
    }

    @Get('placa/:placa')  // Nova rota para obter veículo por placa
    async obterVeiculoPorPlaca(@Param('placa') placa: string): Promise<Veiculo> {
        return this.veiculoService.obterVeiculoPorPlaca(placa);
    }

    @Put(':id')
    async atualizarVeiculo(@Param('id') id: number, @Body() veiculoData: Partial<Veiculo>): Promise<Veiculo> {
        return this.veiculoService.atualizarVeiculo(id, veiculoData);
    }

    @Delete(':id')
    async deletarVeiculo(@Param('id') id: number): Promise<void> {
        return this.veiculoService.deletarVeiculo(id);
    }
}
