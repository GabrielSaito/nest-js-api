import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { OrdemDeServico } from './ordem-de-servico.entity';
import { Categoria } from './categoria.entity';
import { Foto } from './foto.entity';  
import { Empresa } from './empresa.entity';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })  
  nome: string;

  @Column({ type: 'text' }) 
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })  
  preco: number;

  @Column({ nullable: true })  
  tempoEstimado: string;  

  @Column({ default: true })  
  ativo: boolean;

  @OneToMany(() => Foto, (foto) => foto.servico, { cascade: true }) 
  fotos: Foto[];  

  @Column({ default: false })  
  deletado: boolean;

  @ManyToMany(() => Categoria, (categoria) => categoria.servicos, { cascade: true })
  @JoinTable()  
  categorias: Categoria[];

  @OneToMany(() => OrdemDeServico, (ordem) => ordem.servico)
  ordensDeServico: OrdemDeServico[];

  @ManyToOne(() => Empresa, (empresa) => empresa.servicos, { eager: true })
  empresa: Empresa;

   getInformacoesBasicas(): string {
    return `${this.nome} - ${this.preco.toFixed(2)} - ${this.ativo ? 'Ativo' : 'Inativo'}`;
  }
}
