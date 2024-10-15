import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './agenda.service';
 import { Agenda } from '../entities/agenda.entity';
import { AgendaController } from './agenda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda])],
  providers: [AgendaService],
  controllers: [AgendaController],
})
export class AgendaModule {}
