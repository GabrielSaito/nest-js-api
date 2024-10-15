import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Servico } from './servico.entity';
import { Produto } from './produto.entity';
 import { Agenda } from './agenda.entity';
import { Foto } from './foto.entity'; 
import { Funcionario } from './funcionario.entity';  
import { Empresa } from './empresa.entity';

@Entity()
export class OrdemDeServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Servico, { eager: true })
  servico: Servico;

  @ManyToOne(() => Produto, { eager: true, nullable: true })
  produto: Produto; 

 
  @ManyToOne(() => Funcionario, (funcionario) => funcionario.ordensDeServico)  
  funcionario: Funcionario;

  @OneToMany(() => Agenda, (agenda) => agenda.ordemDeServico) 
  agendas: Agenda[];

  @Column({ default: false })  
  deletado: boolean;

  @ManyToOne(() => Empresa, (empresa) => empresa.ordensDeServico, { eager: true })  
  empresa: Empresa;

  @OneToMany(() => Foto, (foto) => foto.ordemDeServico, { nullable: true })
  fotos: Foto[];

  @Column()
  status: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @UpdateDateColumn()
  dataAtualizacao: Date;

  @Column({ nullable: true })
  dataConclusao: Date;

  @Column('text', { nullable: true })
  observacoes: string; 

  @Column('decimal', { precision: 10, scale: 2, nullable: true })  
  custoTotal: number; 

  @Column({ nullable: true })
  tempoEstimado: string; 

  @Column({ nullable: true })
  prioridade: string;  
}
