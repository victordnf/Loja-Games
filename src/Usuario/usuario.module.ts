import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "src/Auth/bcrypt/bcrypt";
import { UsuarioController } from "./controllers/usuario.controller";
import { Usuario } from "./Entities/usuario.entity";
import { UsuarioService } from "./services/usuario.service";


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService, Bcrypt],
    controllers: [UsuarioController],
    exports: [UsuarioService]
})

export class UsuarioModule { }