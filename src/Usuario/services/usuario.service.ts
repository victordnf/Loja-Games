import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "../../Auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../Entities/usuario.entity";
import { Produto } from "src/Produto/entities/produto.entity";


@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario>{
        return await this.usuarioRepository.findOne({
            where:{
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]>{
        return await this.usuarioRepository.find({
            relations:{
                produto: true
            }
        })
    }

    async findById(id: number): Promise<Usuario>{
        let usuario = await this.usuarioRepository.findOne({
            where:{
                id
            },
            relations:{
                produto: true
            }
        });

        if(!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario>{
        let procurarUsuario = await this.findByUsuario(usuario.usuario);

        if(!procurarUsuario){
            usuario.senha = await this.bcrypt.criptograrSenhas(usuario.senha);
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException('O usuário já existe!',HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario>{
        
        let updateUsuario: Usuario = await this.findById(usuario.id);
        let procurarUsuario = await this.findByUsuario(usuario.usuario);

        if(!updateUsuario)
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        if(procurarUsuario && procurarUsuario.id !== usuario.id)
            throw new HttpException('Usuário já cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptograrSenhas(usuario.senha);
        return await this.usuarioRepository.save(usuario);
    }
}