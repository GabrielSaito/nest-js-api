import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { OrdemDeServicoService } from './ordem-de-servico.service';
import { OrdemDeServicoController } from './ordem-de-servico.controller';
import { OrdemDeServico } from 'src/entities/ordem-de-servico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdemDeServico])],
  controllers: [OrdemDeServicoController],
  providers: [OrdemDeServicoService],
})
export class OrdemDeServicoModule {}
