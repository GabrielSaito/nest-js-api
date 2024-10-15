import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrdemDeServico } from './ordem-de-servico.entity';
import { Veiculo } from './veiculo.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cpf: string;  

  @Column()
  nome: string;

  @Column()
  celular: string;  

  @Column()
  telefone: string;  

  @Column({ default: false })
  deletado: boolean;  

  @Column()
  email: string; 

  @Column({ nullable: true })
  endereco: string;  

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cliente) 
  veiculos: Veiculo[];

  @OneToMany(() => OrdemDeServico, (ordem) => ordem.cliente)
  ordensDeServico: OrdemDeServico[];
}
