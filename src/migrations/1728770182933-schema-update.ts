import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1728770182933 implements MigrationInterface {
    name = 'SchemaUpdate1728770182933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "deletado" boolean NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "UQ_0a9942514087463668e9638bf90" UNIQUE ("nome"), CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "preco" numeric(10,2) NOT NULL, "quantidadeEmEstoque" integer NOT NULL, "codigoBarras" character varying NOT NULL, "fornecedor" character varying NOT NULL, "dataValidade" TIMESTAMP, "deletado" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "foto" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "deletado" boolean NOT NULL, "veiculoId" integer, "produtoId" integer, "servicoId" integer, "ordemDeServicoId" integer, CONSTRAINT "PK_2496ab6b734626c5adcd6c0a37f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "servico" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text NOT NULL, "preco" numeric(10,2) NOT NULL, "tempoEstimado" character varying, "ativo" boolean NOT NULL DEFAULT true, "deletado" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_344eb0c344c4fefcd90ef6b66b5" UNIQUE ("nome"), CONSTRAINT "PK_289d0aa6d49f9d0fd65aefc6677" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agenda" ("id" SERIAL NOT NULL, "data" TIMESTAMP NOT NULL, "hora" character varying NOT NULL, "deletado" boolean NOT NULL, "status" character varying NOT NULL DEFAULT 'agendado', "veiculoId" integer, "mecanicoId" integer, "ordemDeServicoId" integer, CONSTRAINT "PK_49397cfc20589bebaac8b43251d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mecanico" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "deletado" boolean NOT NULL DEFAULT false, "cpf" character varying NOT NULL, "telefone" character varying NOT NULL, "especialidade" character varying NOT NULL, CONSTRAINT "PK_bfe5af53a94f114e177a7c358d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cargo" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, "deletado" boolean NOT NULL, "salario" integer, "ativo" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_1af8b2a790f35aedbe7e3da4199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "funcionario" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "telefone" character varying NOT NULL, "deletado" boolean NOT NULL DEFAULT false, "email" character varying, CONSTRAINT "PK_2c5d0c275b4f652fd5cb381655f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordem_de_servico" ("id" SERIAL NOT NULL, "deletado" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dataAtualizacao" TIMESTAMP NOT NULL DEFAULT now(), "dataConclusao" TIMESTAMP, "observacoes" text, "custoTotal" numeric(10,2), "tempoEstimado" character varying, "prioridade" character varying, "clienteId" integer, "servicoId" integer, "produtoId" integer, "mecanicoId" integer, "funcionarioId" integer, CONSTRAINT "PK_a4fabcf07d7eae30fbf8f634024" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "cpf" character varying NOT NULL, "nome" character varying NOT NULL, "celular" character varying NOT NULL, "telefone" character varying NOT NULL, "deletado" boolean NOT NULL, "email" character varying NOT NULL, "endereco" character varying, CONSTRAINT "UQ_980ea33e938c719bbababe43526" UNIQUE ("cpf"), CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veiculo" ("id" SERIAL NOT NULL, "modelo" character varying NOT NULL, "marca" character varying NOT NULL, "deletado" boolean NOT NULL DEFAULT false, "ano" integer NOT NULL, "placa" character varying NOT NULL, "cor" character varying NOT NULL, "quilometragem" integer NOT NULL, "tipoCombustivel" character varying NOT NULL, "numeroPortas" integer NOT NULL, "cambio" character varying NOT NULL, "dataAquisicao" date, "status" character varying NOT NULL DEFAULT 'Ativo', "observacoes" text, "numeroChassi" character varying NOT NULL, "numeroRenavam" character varying NOT NULL, "categoria" character varying NOT NULL, "dataVencimentoIPVA" date, "dataVencimentoLicenca" date, "tipoSeguro" character varying, "nomeSeguradora" character varying, "dataVencimentoSeguro" date, "avaliacao" double precision, "historicoManutencao" text, "acessorios" character varying, "dataVenda" date, "valorVenda" numeric, "statusVenda" character varying NOT NULL DEFAULT 'Não', "tipoVeiculo" character varying, "localizacao" character varying, "historicoAcidentes" text, "multas" text, "dataUltimaManutencao" date, "quilometragemUltimaManutencao" integer, "nomeProprietarioAnterior" character varying, "dataCompra" date, "notasPessoais" character varying, "numeroRegistro" character varying NOT NULL, "clienteId" integer, CONSTRAINT "UQ_a6a498ac4313a6bc4f8967c24d1" UNIQUE ("placa"), CONSTRAINT "UQ_a31fae6a508118586784a895745" UNIQUE ("numeroChassi"), CONSTRAINT "UQ_5813be75ca235244418856a90ac" UNIQUE ("numeroRenavam"), CONSTRAINT "UQ_fda587ad88389432564e1a932e6" UNIQUE ("numeroRegistro"), CONSTRAINT "PK_0fcc9d29b16ed347447f8f9356e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_checklist" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "deletado" boolean NOT NULL DEFAULT false, "descricao" character varying NOT NULL, "realizado" boolean NOT NULL DEFAULT false, "rotinaId" integer, CONSTRAINT "PK_b5a39d884f278b083075abfa6b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rotina" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "deletado" boolean NOT NULL DEFAULT false, "frequencia" character varying NOT NULL, CONSTRAINT "PK_dda374a9512c52ad46707571b57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forma_pagamento" ("id" SERIAL NOT NULL, "deletado" boolean NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "UQ_0b6e47aa24b52bef866f05b8175" UNIQUE ("descricao"), CONSTRAINT "PK_059f733b255fa01d5100a8fa53c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faturamento" ("id" SERIAL NOT NULL, "valor" numeric(10,2) NOT NULL, "deletado" boolean NOT NULL, "dataFaturamento" TIMESTAMP NOT NULL, "ordemDeServicoId" integer, "formaPagamentoId" integer, CONSTRAINT "PK_308e1b2d9c631dc7e0b8f7e4e7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "servico_categorias_categoria" ("servicoId" integer NOT NULL, "categoriaId" integer NOT NULL, CONSTRAINT "PK_6fc4d3d744300e17a2e9d729bde" PRIMARY KEY ("servicoId", "categoriaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8b0b89f1aff04593839680c5c" ON "servico_categorias_categoria" ("servicoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_04782e0a83078980d5c6d270af" ON "servico_categorias_categoria" ("categoriaId") `);
        await queryRunner.query(`CREATE TABLE "funcionario_cargos_cargo" ("funcionarioId" integer NOT NULL, "cargoId" integer NOT NULL, CONSTRAINT "PK_c7d4b626dd87732e3fe1761fcc3" PRIMARY KEY ("funcionarioId", "cargoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3cbfa3ae03b33bea6560d02181" ON "funcionario_cargos_cargo" ("funcionarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d1735705cddaf655d860f8c3fc" ON "funcionario_cargos_cargo" ("cargoId") `);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_9db74c9056c0e8c78c9a37ecbf7" FOREIGN KEY ("veiculoId") REFERENCES "veiculo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_2c4147d5b3e9949774cf458385d" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_9026366a29c4aeb2e27a5e566f8" FOREIGN KEY ("servicoId") REFERENCES "servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foto" ADD CONSTRAINT "FK_9bebd24362df0fa86f413393f07" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordem_de_servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_8d0547555fe624b9c10317cd963" FOREIGN KEY ("veiculoId") REFERENCES "veiculo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_458219680f7fea9aec5d4e3c0f8" FOREIGN KEY ("mecanicoId") REFERENCES "mecanico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_433029724c625d4072e0898716d" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordem_de_servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" ADD CONSTRAINT "FK_15f7cd9c8305e0040c4b683b174" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" ADD CONSTRAINT "FK_54863d1435e7491aab0cf8439f7" FOREIGN KEY ("servicoId") REFERENCES "servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" ADD CONSTRAINT "FK_eedb3dc7210137a7f5db6506559" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" ADD CONSTRAINT "FK_74c9542f7898e9e364c590b60f4" FOREIGN KEY ("mecanicoId") REFERENCES "mecanico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" ADD CONSTRAINT "FK_57f1afa49fe88aeb0ecb75807f2" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculo" ADD CONSTRAINT "FK_1b57096c4169d79da78c6038274" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_checklist" ADD CONSTRAINT "FK_0623033f76910007af78fdb88c1" FOREIGN KEY ("rotinaId") REFERENCES "rotina"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faturamento" ADD CONSTRAINT "FK_5564b046c5aca566b1dacdcbe88" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordem_de_servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faturamento" ADD CONSTRAINT "FK_374614e9d8ca87d17b32e711f31" FOREIGN KEY ("formaPagamentoId") REFERENCES "forma_pagamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "servico_categorias_categoria" ADD CONSTRAINT "FK_f8b0b89f1aff04593839680c5c5" FOREIGN KEY ("servicoId") REFERENCES "servico"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "servico_categorias_categoria" ADD CONSTRAINT "FK_04782e0a83078980d5c6d270af1" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funcionario_cargos_cargo" ADD CONSTRAINT "FK_3cbfa3ae03b33bea6560d02181d" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "funcionario_cargos_cargo" ADD CONSTRAINT "FK_d1735705cddaf655d860f8c3fc5" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario_cargos_cargo" DROP CONSTRAINT "FK_d1735705cddaf655d860f8c3fc5"`);
        await queryRunner.query(`ALTER TABLE "funcionario_cargos_cargo" DROP CONSTRAINT "FK_3cbfa3ae03b33bea6560d02181d"`);
        await queryRunner.query(`ALTER TABLE "servico_categorias_categoria" DROP CONSTRAINT "FK_04782e0a83078980d5c6d270af1"`);
        await queryRunner.query(`ALTER TABLE "servico_categorias_categoria" DROP CONSTRAINT "FK_f8b0b89f1aff04593839680c5c5"`);
        await queryRunner.query(`ALTER TABLE "faturamento" DROP CONSTRAINT "FK_374614e9d8ca87d17b32e711f31"`);
        await queryRunner.query(`ALTER TABLE "faturamento" DROP CONSTRAINT "FK_5564b046c5aca566b1dacdcbe88"`);
        await queryRunner.query(`ALTER TABLE "item_checklist" DROP CONSTRAINT "FK_0623033f76910007af78fdb88c1"`);
        await queryRunner.query(`ALTER TABLE "veiculo" DROP CONSTRAINT "FK_1b57096c4169d79da78c6038274"`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" DROP CONSTRAINT "FK_57f1afa49fe88aeb0ecb75807f2"`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" DROP CONSTRAINT "FK_74c9542f7898e9e364c590b60f4"`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" DROP CONSTRAINT "FK_eedb3dc7210137a7f5db6506559"`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" DROP CONSTRAINT "FK_54863d1435e7491aab0cf8439f7"`);
        await queryRunner.query(`ALTER TABLE "ordem_de_servico" DROP CONSTRAINT "FK_15f7cd9c8305e0040c4b683b174"`);
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_433029724c625d4072e0898716d"`);
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_458219680f7fea9aec5d4e3c0f8"`);
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_8d0547555fe624b9c10317cd963"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_9bebd24362df0fa86f413393f07"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_9026366a29c4aeb2e27a5e566f8"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_2c4147d5b3e9949774cf458385d"`);
        await queryRunner.query(`ALTER TABLE "foto" DROP CONSTRAINT "FK_9db74c9056c0e8c78c9a37ecbf7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1735705cddaf655d860f8c3fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cbfa3ae03b33bea6560d02181"`);
        await queryRunner.query(`DROP TABLE "funcionario_cargos_cargo"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04782e0a83078980d5c6d270af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8b0b89f1aff04593839680c5c"`);
        await queryRunner.query(`DROP TABLE "servico_categorias_categoria"`);
        await queryRunner.query(`DROP TABLE "faturamento"`);
        await queryRunner.query(`DROP TABLE "forma_pagamento"`);
        await queryRunner.query(`DROP TABLE "rotina"`);
        await queryRunner.query(`DROP TABLE "item_checklist"`);
        await queryRunner.query(`DROP TABLE "veiculo"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "ordem_de_servico"`);
        await queryRunner.query(`DROP TABLE "funcionario"`);
        await queryRunner.query(`DROP TABLE "cargo"`);
        await queryRunner.query(`DROP TABLE "mecanico"`);
        await queryRunner.query(`DROP TABLE "agenda"`);
        await queryRunner.query(`DROP TABLE "servico"`);
        await queryRunner.query(`DROP TABLE "foto"`);
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
    }

}
