import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Foto } from './foto.entity';
import { Agenda } from './agenda.entity';

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column({ default: false })  
  deletado: boolean;

  @Column()
  ano: number;

  @Column({ unique: true })
  placa: string;

  @Column()
  cor: string; 

  @Column({ type: 'int' })
  quilometragem: number; 

  @Column()
  tipoCombustivel: string; 

  @Column({ type: 'int' })
  numeroPortas: number; 

  @Column()
  cambio: string; 

  @Column({ type: 'date', nullable: true })
  dataAquisicao: Date; 
  @Column({ default: 'Ativo' })
  status: string; 

  @Column({ nullable: true, type: 'text' })
  observacoes: string;

  @Column({ unique: true })
  numeroChassi: string; 

  @Column({ unique: true })
  numeroRenavam: string;

  @Column()
  categoria: string;

  @Column({ type: 'date', nullable: true })
  dataVencimentoIPVA: Date; 

  @Column({ type: 'date', nullable: true })
  dataVencimentoLicenca: Date;

  @Column({ nullable: true })
  tipoSeguro: string; 

  @Column({ nullable: true })
  nomeSeguradora: string; 

  @Column({ type: 'date', nullable: true })
  dataVencimentoSeguro: Date; 

  @Column({ type: 'float', nullable: true })
  avaliacao: number; 

  @Column({ type: 'text', nullable: true })
  historicoManutencao: string; 

  @Column({ nullable: true })
  acessorios: string; 

  @Column({ type: 'date', nullable: true })
  dataVenda: Date;

  @Column({ type: 'decimal', nullable: true })
  valorVenda: number;

  @Column({ default: 'Não' })
  statusVenda: string; 

  @Column({ nullable: true })
  tipoVeiculo: string; 

  @Column({ nullable: true })
  localizacao: string;

  @Column({ type: 'text', nullable: true })
  historicoAcidentes: string; 

  @Column({ type: 'text', nullable: true })
  multas: string; 

  @Column({ type: 'date', nullable: true })
  dataUltimaManutencao: Date; 

  @Column({ type: 'int', nullable: true })
  quilometragemUltimaManutencao: number; 

  @Column({ nullable: true })
  nomeProprietarioAnterior: string;

  @Column({ type: 'date', nullable: true })
  dataCompra: Date; 

  @Column({ nullable: true })
  notasPessoais: string;

  @Column({ unique: true })
  numeroRegistro: string; 

  @ManyToOne(() => Cliente, (cliente) => cliente.veiculos)  
  cliente: Cliente;

  @OneToMany(() => Foto, (foto) => foto.veiculo)  
  fotos: Foto[];

  @OneToMany(() => Agenda, (agenda) => agenda.veiculo) 
  agendas: Agenda[];
}
