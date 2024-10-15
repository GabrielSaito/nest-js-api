 import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from 'src/entities/funcionario.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}

  async criarFuncionario(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = this.funcionarioRepository.create(funcionarioData);
    return this.funcionarioRepository.save(funcionario);
  }

  async obterTodosFuncionarios(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ relations: ['cargos'] });
  }

  async obterFuncionarioPorId(id: number): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { id }, relations: ['cargos'] });
  }

  async atualizarFuncionario(id: number, funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    await this.funcionarioRepository.update(id, funcionarioData);
    return this.obterFuncionarioPorId(id);
  }

  async deletarFuncionario(id: number): Promise<void> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }

     funcionario.deletado = true;  
    await this.funcionarioRepository.save(funcionario);
  }
}
