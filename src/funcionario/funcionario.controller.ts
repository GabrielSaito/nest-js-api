// funcionario.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from 'src/entities/funcionario.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
@UseGuards(JwtAuthGuard)

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  async criarFuncionario(@Body() funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    return this.funcionarioService.criarFuncionario(funcionarioData);
  }

  @Get()
  async obterTodosFuncionarios(): Promise<Funcionario[]> {
    return this.funcionarioService.obterTodosFuncionarios();
  }

  @Get(':id')
  async obterFuncionarioPorId(@Param('id') id: number): Promise<Funcionario> {
    return this.funcionarioService.obterFuncionarioPorId(id);
  }

  @Put(':id')
  async atualizarFuncionario(@Param('id') id: number, @Body() funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    return this.funcionarioService.atualizarFuncionario(id, funcionarioData);
  }

  @Delete(':id')
  async deletarFuncionario(@Param('id') id: number): Promise<void> {
    return this.funcionarioService.deletarFuncionario(id);
  }
}
