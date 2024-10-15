import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from 'src/entities/empresa.entity';
import { DataSource, Repository } from 'typeorm';
 
@Injectable()
export class DatabaseService {
    private dataSources: Map<number, DataSource> = new Map();

    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>,
      ) {}

    async getDataSource(empresaId: number): Promise<DataSource> {
        if (this.dataSources.has(empresaId)) {
            return this.dataSources.get(empresaId);
        }

        const empresa = await this.acharEmpresaPorId(empresaId); 
        const dataSource = new DataSource({
            type: 'postgres',
            host: empresa.host,
            port: empresa.port,
            username: empresa.username,
            password: empresa.password,
            database: empresa.database,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        });

        await dataSource.initialize(); 
        this.dataSources.set(empresaId, dataSource);
        return dataSource;
    }

    private async acharEmpresaPorId(empresaId: number): Promise<Empresa> {
        const empresa = await this.empresaRepository.findOne({ where: { id: empresaId } });
    
        if (!empresa) {
          throw new NotFoundException(`Empresa com ID ${empresaId} não encontrada`);
        }
    
        return empresa;
      }
}
