import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrdemDeServico } from './ordem-de-servico.entity';
import { FormaPagamento } from './forma-pagamento.entity';

@Entity()
export class Faturamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrdemDeServico, { eager: true })
  ordemDeServico: OrdemDeServico;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column()
  deletado: boolean;
  
  @Column()
  dataFaturamento: Date;

  @ManyToOne(() => FormaPagamento, { eager: true })
  formaPagamento: FormaPagamento; 
}
