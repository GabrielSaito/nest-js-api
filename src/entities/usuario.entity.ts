import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Empresa } from './empresa.entity';
 
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuarios)
  empresa: Empresa;
 

 }
