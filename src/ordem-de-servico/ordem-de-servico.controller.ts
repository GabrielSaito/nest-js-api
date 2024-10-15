import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { OrdemDeServicoService } from './ordem-de-servico.service';
import { OrdemDeServico } from 'src/entities/ordem-de-servico.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
 
@UseGuards(JwtAuthGuard)
@Controller('ordens-de-servico')
export class OrdemDeServicoController {
  constructor(private readonly ordemDeServicoService: OrdemDeServicoService) {}

  @Post()
  async criar(@Body() ordemDeServico: Partial<OrdemDeServico>): Promise<OrdemDeServico> {
    return this.ordemDeServicoService.criar(ordemDeServico);
  }

  @Get()
  async listar(): Promise<OrdemDeServico[]> {
    return this.ordemDeServicoService.listar();
  }

  @Get(':id')
  async obterPorId(@Param('id') id: number): Promise<OrdemDeServico> {
    return this.ordemDeServicoService.obterPorId(id);
  }

  @Put(':id')
  async atualizar(@Param('id') id: number, @Body() dadosAtualizados: Partial<OrdemDeServico>): Promise<OrdemDeServico> {
    return this.ordemDeServicoService.atualizar(id, dadosAtualizados);
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<void> {
    return this.ordemDeServicoService.deletar(id);
  }
}
