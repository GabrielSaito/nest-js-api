import { Controller, Get, Post, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from 'src/entities/cliente.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';

@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async criar(@Body() cliente: Partial<Cliente>): Promise<Cliente> {
    return this.clienteService.criar(cliente);
  }

  @Get()
  async listarTodos(): Promise<Cliente[]> {
    return this.clienteService.listarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.buscarPorId(id);
  }

  @Patch(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() dadosAtualizados: Partial<Cliente>,
  ): Promise<Cliente> {
    return this.clienteService.atualizar(id, dadosAtualizados);
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<void> {
    return this.clienteService.deletar(id);
  }
}
