import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { Rotina } from 'src/entities/rotina.entity';
import { ItemChecklist } from 'src/entities/itemChecklist.entity';
 
@Module({
    imports: [
        TypeOrmModule.forFeature([Rotina, ItemChecklist]), 
    ],
    controllers: [ChecklistController], // Controlador do módulo
    providers: [ChecklistService], // Serviço do módulo
})
export class ChecklistModule {}
