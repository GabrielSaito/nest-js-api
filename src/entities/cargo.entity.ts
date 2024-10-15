import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { Empresa } from './empresa.entity';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column()
  deletado: boolean;

  @Column({ nullable: true })
  salario: number; 

  @Column({ default: true })
  ativo: boolean;  

  @ManyToOne(() => Empresa, (empresa) => empresa.cargos, { eager: true })
  empresa: Empresa;
  
  @OneToMany(() => Funcionario, (funcionario) => funcionario.cargos)
  funcionarios: Funcionario[];
}
