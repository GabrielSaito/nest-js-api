import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ItemChecklist } from 'src/entities/itemChecklist.entity';
import { Rotina } from 'src/entities/rotina.entity';
  
@Controller('checklist')
export class ChecklistController {
    constructor(private readonly checklistService: ChecklistService) {}

     @Post('rotina')
    async criarRotina(@Body() body: { nome: string; frequencia: string }): Promise<Rotina> {
        return this.checklistService.criarRotina(body.nome, body.frequencia);
    }

     @Post('rotina/:id/item')
    async adicionarItemARotina(
        @Param('id') rotinaId: number,
        @Body() body: { nome: string; descricao: string }
    ): Promise<ItemChecklist> {
        return this.checklistService.adicionarItemARotina(rotinaId, body.nome, body.descricao);
    }

     @Get('rotinas')
    async listarRotinas(): Promise<Rotina[]> {
        return this.checklistService.listarRotinas();
    }

     @Post('item/:id/marcar')
    async marcarItemComoRealizado(@Param('id') itemId: number): Promise<void> {
        return this.checklistService.marcarItemComoRealizado(itemId);
    }
}
