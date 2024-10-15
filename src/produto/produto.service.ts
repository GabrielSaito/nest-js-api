// src/produto/produto.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/entities/produto.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
    ) {}

    async salvarProduto(produto: Partial<Produto>): Promise<Produto> {
        const novoProduto = this.produtoRepository.create(produto);
        return this.produtoRepository.save(novoProduto);
    }

    async listarProdutos(): Promise<Produto[]> {
        return this.produtoRepository.find();
    }

    async deletarProduto(id: number): Promise<void> {
        const produto = await this.produtoRepository.findOne({ where: { id } });
        if (!produto) {
          throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }
    
         produto.deletado = true; 
        await this.produtoRepository.save(produto);
      }
}
