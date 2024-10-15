import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ItemChecklist } from './itemChecklist.entity';

@Entity()
export class Rotina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ default: false })  
    deletado: boolean;

    @Column()
    frequencia: string;

    @OneToMany(() => ItemChecklist, item => item.rotina)
    itens: ItemChecklist[];
}