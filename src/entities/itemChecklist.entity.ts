import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Rotina } from './rotina.entity';

@Entity()
export class ItemChecklist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ default: false })  
    deletado: boolean;

    @Column()
    descricao: string;

    @Column({ default: false })
    realizado: boolean;

    @ManyToOne(() => Rotina, rotina => rotina.itens)
    rotina: Rotina;
}