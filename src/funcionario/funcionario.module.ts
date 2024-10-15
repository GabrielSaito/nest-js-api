// funcionario.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { Funcionario } from 'src/entities/funcionario.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  providers: [FuncionarioService],
  controllers: [FuncionarioController],
})
export class FuncionarioModule {}
