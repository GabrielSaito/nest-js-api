 import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Veiculo } from './veiculo.entity';
 import { OrdemDeServico } from './ordem-de-servico.entity';
  
@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date; 

  @Column()
  hora: string; 

  @Column()
  deletado: boolean; 

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.agendas)
  veiculo: Veiculo; 

  @ManyToOne(() => OrdemDeServico, (ordem) => ordem.agendas, { nullable: true })
  ordemDeServico: OrdemDeServico; 

  @Column({ default: 'agendado' }) 
  status: string; 
}
