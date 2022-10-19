import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './Categoria/categoria.module';
import { Categoria } from './Categoria/entities/categoria.entity';
import { Produto } from './Produto/entities/produto.entity';
import { ProdutoModule } from './Produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojagame',
      entities: [Produto, Categoria],
      synchronize: true
    }),
    ProdutoModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
