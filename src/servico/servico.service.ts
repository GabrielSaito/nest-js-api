import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from 'src/entities/servico.entity'; 
import { Foto } from 'src/entities/foto.entity'; 

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
    ) {}

   async criarServico(servicoData: Servico): Promise<Servico> {
    const novoServico = this.servicoRepository.create(servicoData);
    return this.servicoRepository.save(novoServico);
  }

   async obterServicos(): Promise<Servico[]> {
    return this.servicoRepository.find({ relations: ['fotos', 'categorias'] });  
  }

   async obterServicoPorId(id: number): Promise<Servico> {
    return this.servicoRepository.findOne({ where: { id }, relations: ['fotos', 'categorias'] });
  }

   async atualizarServico(id: number, servicoData: Partial<Servico>): Promise<Servico> {
    await this.servicoRepository.update(id, servicoData);
    return this.obterServicoPorId(id); 
  }
 
  async deletarServico(id: number): Promise<void> {
    const servico = await this.servicoRepository.findOne({ where: { id } });
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

     servico.deletado = true;  
    await this.servicoRepository.save(servico);
  }
}
