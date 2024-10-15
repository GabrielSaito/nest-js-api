import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { Agenda } from '../entities/agenda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';

@UseGuards(JwtAuthGuard)
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService,
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,
  ) {}

  @Post()
  async criar(@Body() agendaData: Partial<Agenda>): Promise<Agenda> {
    return this.agendaService.criar(agendaData);
  }

  @Get()
  async listarTodas(): Promise<Agenda[]> {
    return this.agendaService.listarTodas();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Agenda> {
    return this.agendaService.buscarPorId(id);
  }

  @Put(':id')
  async atualizar(@Param('id') id: number, @Body() agendaData: Partial<Agenda>): Promise<Agenda> {
    return this.agendaService.atualizar(id, agendaData);
  }

  @Delete(':id')
  async remover(id: number): Promise<void> {
    const agenda = await this.agendaRepository.findOne({ where: { id } });
    if (!agenda) {
      throw new NotFoundException(`Agenda com ID ${id} não encontrada`);
    }
     agenda.deletado = true;  
    await this.agendaRepository.save(agenda);
  }
}
