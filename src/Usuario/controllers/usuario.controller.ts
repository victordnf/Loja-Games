import { HttpStatus, Controller, Get, HttpCode} from "@nestjs/common";
import { Body, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "../../Auth/guard/jwt-auth.guard";
import { Usuario } from "../Entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";


@Controller('/usuario')
export class UsuarioController{
    constructor( private readonly usuarioService: UsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll()
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.update(usuario)
    }
}