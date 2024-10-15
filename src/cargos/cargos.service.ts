import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from 'src/entities/cargo.entity';
import { Repository } from 'typeorm'; 

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find({ where: { deletado: false } });
  }

  async findById(id: number): Promise<Cargo> {
    const cargo = await this.cargoRepository.findOne({ where: { id, deletado: false } });
    if (!cargo) {
      throw new NotFoundException(`Cargo com ID ${id} não encontrado`);
    }
    return cargo;
  }

  async create(cargoData: Partial<Cargo>): Promise<Cargo> {
    const cargo = this.cargoRepository.create(cargoData);
    return this.cargoRepository.save(cargo);
  }

  async update(id: number, cargoData: Partial<Cargo>): Promise<Cargo> {
    await this.findById(id); 
    await this.cargoRepository.update(id, cargoData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const cargo = await this.findById(id);  
    cargo.deletado = true;  
    await this.cargoRepository.save(cargo);
  }
}
