import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoModule } from './servico/servico.module';
import { ProdutoModule } from './produto/produto.module'; 
import { AgendaModule } from './agenda/agenda.module'; 
import { ChecklistModule } from './checklist/checklist.module'; 
import { VeiculoModule } from './veiculo/veiculo.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { OrdemDeServicoModule } from './ordem-de-servico/ordem-de-servico-module';
import { ClienteModule } from './cliente/cliente.module';
import { CargoModule } from './cargos/cargos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  
      port: 5432, 
      username: 'postgres', 
      password: 'postgres', 
      database: 'ordemservico',  
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
     }),
    ServicoModule,
    ProdutoModule,
    AgendaModule,
    ChecklistModule,
    ProdutoModule,
    VeiculoModule,
    FuncionarioModule,
    OrdemDeServicoModule,
    ClienteModule,
    CargoModule,
    AuthModule
  ],
})
export class AppModule {}
