import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { Servico } from 'src/entities/servico.entity'; // Ajuste o caminho conforme necessário

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  async criarServico(@Body() servicoData: Servico): Promise<Servico> {
    return this.servicoService.criarServico(servicoData);
  }

  @Get()
  async obterServicos(): Promise<Servico[]> {
    return this.servicoService.obterServicos();
  }

  @Get(':id')
  async obterServicoPorId(@Param('id') id: number): Promise<Servico> {
    return this.servicoService.obterServicoPorId(id);
  }

  @Put(':id')
  async atualizarServico(
    @Param('id') id: number,
    @Body() servicoData: Partial<Servico>
  ): Promise<Servico> {
    return this.servicoService.atualizarServico(id, servicoData);
  }

  @Delete(':id')
  async deletarServico(@Param('id') id: number): Promise<void> {
    return this.servicoService.deletarServico(id);
  }
}
