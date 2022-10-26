import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../Auth/guard/jwt-auth.guard";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@UseGuards(JwtAuthGuard)
@Controller('/categorias')
export class CategoriaController{
    constructor(private readonly categoriaService: CategoriaService) { };

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.categoriaService.findById(id);
    }
    
    @Get('/nome/:nomeCategoria')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nomeCategoria') nomeCategoria: string): Promise<Categoria[]>{
        return this.categoriaService.findByNome(nomeCategoria);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.create(categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.update(categoria);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.categoriaService.delete(id)
    }
}