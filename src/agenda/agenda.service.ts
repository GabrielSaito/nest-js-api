import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from '../entities/agenda.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
  ) {}

  async criar(agendaData: Partial<Agenda>): Promise<Agenda> {
    const agenda = this.agendaRepository.create(agendaData);
    return await this.agendaRepository.save(agenda);
  }

  async listarTodas(): Promise<Agenda[]> {
    return await this.agendaRepository.find();
  }

  async buscarPorId(id: number): Promise<Agenda> {
    return await this.agendaRepository.findOneBy({ id });
  }

  async atualizar(id: number, agendaData: Partial<Agenda>): Promise<Agenda> {
    await this.agendaRepository.update(id, agendaData);
    return this.buscarPorId(id);
  }

  async remover(id: number): Promise<void> {
    await this.agendaRepository.delete(id);
  }
}
