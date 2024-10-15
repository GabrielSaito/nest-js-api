import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdemDeServico } from 'src/entities/ordem-de-servico.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class OrdemDeServicoService {
  constructor(
    @InjectRepository(OrdemDeServico)
    private ordemDeServicoRepository: Repository<OrdemDeServico>,
  ) {}

  async criar(ordemDeServico: Partial<OrdemDeServico>): Promise<OrdemDeServico> {
    const novaOrdemDeServico = this.ordemDeServicoRepository.create(ordemDeServico);
    return this.ordemDeServicoRepository.save(novaOrdemDeServico);
  }

  async listar(): Promise<OrdemDeServico[]> {
    return this.ordemDeServicoRepository.find({ relations: ['cliente', 'servico', 'produto', 'mecanico', 'funcionario', 'agendas', 'fotos'] });
  }

  async obterPorId(id: number): Promise<OrdemDeServico> {
    const ordem = await this.ordemDeServicoRepository.findOne({ where: { id }, relations: ['cliente', 'servico', 'produto', 'mecanico', 'funcionario', 'agendas', 'fotos'] });
    if (!ordem) {
      throw new NotFoundException(`Ordem de Serviço com ID ${id} não encontrada`);
    }
    return ordem;
  }

  async atualizar(id: number, dadosAtualizados: Partial<OrdemDeServico>): Promise<OrdemDeServico> {
    await this.obterPorId(id); 
    await this.ordemDeServicoRepository.update(id, dadosAtualizados);
    return this.obterPorId(id);
  }

  async deletar(id: number): Promise<void> {
    const ordem = await this.obterPorId(id);
    await this.ordemDeServicoRepository.remove(ordem); 
  }
}
