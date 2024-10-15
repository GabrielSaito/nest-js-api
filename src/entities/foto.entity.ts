import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Veiculo } from './veiculo.entity';
import { Produto } from './produto.entity';
import { Servico } from './servico.entity';  
import { OrdemDeServico } from './ordem-de-servico.entity';

@Entity()
export class Foto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string; 

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.fotos, { nullable: true })
  veiculo: Veiculo;

  @Column({ default: false })
  deletado: boolean;  

  @ManyToOne(() => Produto, (produto) => produto.fotos, { nullable: true })
  produto: Produto;

  @ManyToOne(() => Servico, (servico) => servico.fotos, { nullable: true })  
  servico: Servico;

  @ManyToOne(() => OrdemDeServico, (ordemDeServico) => ordemDeServico.fotos, { nullable: true }) // Adicionando relação com OrdemDeServico
  ordemDeServico: OrdemDeServico;
}
