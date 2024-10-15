// src/produto/produto.controller.ts
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service'; 
import { Produto } from 'src/entities/produto.entity';
import { Foto } from 'src/entities/foto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criarProduto(@Body() produtoData: { produto: Produto; fotos: Foto[] }): Promise<Produto> {
    const { produto, fotos } = produtoData;
    produto.fotos = fotos; 
    return this.produtoService.salvarProduto(produto);
  }

  @Get()
  async obterProdutos(): Promise<Produto[]> {
    return this.produtoService.listarProdutos(); 
  }

  @Delete(':id')
  async remover(@Param('id') id: number): Promise<void> {
    return this.produtoService.deletarProduto(id);
  }
}
