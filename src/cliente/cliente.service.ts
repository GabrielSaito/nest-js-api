import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async criar(cliente: Partial<Cliente>): Promise<Cliente> {
    const novoCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(novoCliente);
  }

  async listarTodos(): Promise<Cliente[]> {
    return this.clienteRepository.find({ relations: ['veiculos', 'ordensDeServico'] });
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['veiculos', 'ordensDeServico'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async atualizar(id: number, dadosAtualizados: Partial<Cliente>): Promise<Cliente> {
    const cliente = await this.buscarPorId(id);
    Object.assign(cliente, dadosAtualizados);
    return this.clienteRepository.save(cliente);
  }

  async deletar(id: number): Promise<void> {
    const cliente = await this.buscarPorId(id);
    cliente.deletado = true;
    await this.clienteRepository.save(cliente);
  }
}
