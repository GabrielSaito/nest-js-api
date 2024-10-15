import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemChecklist } from "src/entities/itemChecklist.entity";
import { Rotina } from "src/entities/rotina.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChecklistService {
    constructor(
        @InjectRepository(Rotina)
        private rotinaRepository: Repository<Rotina>,

        @InjectRepository(ItemChecklist)
        private itemRepository: Repository<ItemChecklist>,
    ) {}

    async criarRotina(nome: string, frequencia: string): Promise<Rotina> {
        const rotina = this.rotinaRepository.create({ nome, frequencia });
        return await this.rotinaRepository.save(rotina);
    }

    async adicionarItemARotina(rotinaId: number, nome: string, descricao: string): Promise<ItemChecklist> {
        const rotina = await this.rotinaRepository.findOne({ where: { id: rotinaId } });
        const item = this.itemRepository.create({ nome, descricao, rotina });
        return await this.itemRepository.save(item);
    }

    async listarRotinas(): Promise<Rotina[]> {
        return await this.rotinaRepository.find({ relations: ['itens'] });
    }

    async marcarItemComoRealizado(itemId: number): Promise<void> {
        const item = await this.itemRepository.findOne({ where: { id: itemId } });
        if (item) {
            item.realizado = true;
            await this.itemRepository.save(item);
        }
    }
}
