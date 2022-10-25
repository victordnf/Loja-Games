import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Auth/auth.module';
import { CategoriaModule } from './Categoria/categoria.module';
import { Categoria } from './Categoria/entities/categoria.entity';
import { Produto } from './Produto/entities/produto.entity';
import { ProdutoModule } from './Produto/produto.module';
import { Usuario } from './Usuario/Entities/usuario.entity';
import { UsuarioModule } from './Usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojagame',
      entities: [Produto, Categoria, Usuario],
      synchronize: true
    }),
    ProdutoModule,
    CategoriaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
