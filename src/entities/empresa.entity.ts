import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Funcionario } from './funcionario.entity';  
import { OrdemDeServico } from './ordem-de-servico.entity'; 
import { Servico } from './servico.entity';
import { Cargo } from './cargo.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column()
  razaoSocial: string;

  @Column()
  cnpj: string;

  @Column()
  endereco: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  host: string;  

  @Column()
  port: number; 

  @Column()
  username: string;  
  @Column()
  password: string;  

  @Column()
  database: string;  

  @OneToMany(() => Funcionario, (funcionario) => funcionario.empresa)  
  funcionarios: Funcionario[];

  @OneToMany(() => Usuario, (Usuario) => Usuario.empresa)  
  usuarios: Usuario[];

  @OneToMany(() => OrdemDeServico, (ordemDeServico) => ordemDeServico.empresa)  
  ordensDeServico: OrdemDeServico[];

  @OneToMany(() => Cargo, (cargo) => cargo.empresa)
  cargos: Cargo[];

  @OneToMany(() => Servico, (servico) => servico.empresa)
  servicos: Servico[];

  @Column({ default: false })
  deletado: boolean;  
}
