import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../Usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any>{
        const procurarUsuario = await this.usuarioService.findByUsuario(username);

        if(!procurarUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        const match = await this.bcrypt.compararSenhas(procurarUsuario.senha, password);

        if(!procurarUsuario && match) {
            const {senha, ...result} = procurarUsuario;
            return result;
        }

        return null;
    }
    /*
     *      Chances de ocorrer erro e o problema estar aqui  =>  ↓↓↓↓   
     */
    async login(usuarioLogin: any) {
        const payload = {username: usuarioLogin.usuario, sub: 'lojagames' };

        return{
            usuario: usuarioLogin.usuario,
            token: `Bearer ${this.jwtService.sign(payload)}`
        };
    }
}