import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from 'src/entities/veiculo.entity';

@Injectable()
export class VeiculoService {
    constructor(
        @InjectRepository(Veiculo)
        private readonly veiculoRepository: Repository<Veiculo>,
    ) {}

    async criarVeiculo(veiculoData: Partial<Veiculo>): Promise<Veiculo> {
        const novoVeiculo = this.veiculoRepository.create(veiculoData);
        return this.veiculoRepository.save(novoVeiculo);
    }

    async obterTodosVeiculos(): Promise<Veiculo[]> {
        return this.veiculoRepository.find({ relations: ['fotos', 'cliente'] });
    }

    async obterVeiculoPorId(id: number): Promise<Veiculo> {
        const veiculo = await this.veiculoRepository.findOne({ where: { id }, relations: ['fotos', 'cliente'] });
        if (!veiculo) {
            throw new NotFoundException(`Veículo com ID ${id} não encontrado`);
        }
        return veiculo;
    }

    async obterVeiculoPorPlaca(placa: string): Promise<Veiculo> {
        const veiculo = await this.veiculoRepository.findOne({ where: { placa }, relations: ['fotos', 'cliente'] });
        if (!veiculo) {
            throw new NotFoundException(`Veículo com placa ${placa} não encontrado`);
        }
        return veiculo;
    }

    async atualizarVeiculo(id: number, veiculoData: Partial<Veiculo>): Promise<Veiculo> {
        await this.veiculoRepository.update(id, veiculoData);
        const veiculoAtualizado = await this.obterVeiculoPorId(id);  
        return veiculoAtualizado;
    }

    async deletarVeiculo(id: number): Promise<void> {
        const veiculo = await this.veiculoRepository.findOne({ where: { id } });
        if (!veiculo) {
          throw new NotFoundException(`Veículo com ID ${id} não encontrado`);
        }    
         veiculo.deletado = true;
        await this.veiculoRepository.save(veiculo);
      }
}
