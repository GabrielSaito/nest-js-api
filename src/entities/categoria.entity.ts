import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Servico } from './servico.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  deletado: boolean;  

  @Column({ unique: true }) 
  nome: string;

  @ManyToMany(() => Servico, (servico) => servico.categorias)
  servicos: Servico[];
}
