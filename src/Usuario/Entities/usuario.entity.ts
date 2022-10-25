import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Produto } from "src/Produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_usuarios'})
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 120, nullable: false})
    nome: string;

    @IsEmail()
    @Column({length: 120, nullable: false})
    usuario: string;

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 120, nullable: false})
    senha: string;

    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[];
}