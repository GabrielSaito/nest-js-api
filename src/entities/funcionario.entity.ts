import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { OrdemDeServico } from './ordem-de-servico.entity';
import { Cargo } from './cargo.entity';
import { Empresa } from './empresa.entity';
import { Agenda } from './agenda.entity';
 
@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column({ default: false })  
  deletado: boolean;

  @Column({ nullable: true })
  email: string;
 

  @ManyToOne(() => Empresa, (empresa) => empresa.funcionarios, { eager: true })  
  empresa: Empresa;

  @ManyToMany(() => Cargo, (cargo) => cargo.funcionarios, { eager: true })
  @JoinTable()  
  cargos: Cargo[];  

  @OneToMany(() => OrdemDeServico, (ordem) => ordem.funcionario)
  ordensDeServico: OrdemDeServico[];
}
