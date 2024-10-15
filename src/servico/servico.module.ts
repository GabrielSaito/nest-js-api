import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from 'src/entities/servico.entity'; 
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  providers: [ServicoService],
  controllers: [ServicoController],
})
export class ServicoModule {}
