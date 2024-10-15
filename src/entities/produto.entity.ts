import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Foto } from './foto.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  quantidadeEmEstoque: number;

  @Column()
  codigoBarras: string;  

  @Column()
  fornecedor: string; 

  @Column({ nullable: true })
  dataValidade: Date; 

  @Column({ default: false })  
  deletado: boolean;

  @OneToMany(() => Foto, (foto) => foto.produto ,{ cascade: true })  
  fotos: Foto[];
}
