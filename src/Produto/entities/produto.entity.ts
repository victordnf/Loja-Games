import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/Categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_produtos"})
export class Produto{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 30, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column("decimal", {precision: 7, scale: 2})
    preco: number;

    @IsNotEmpty()
    @Column({length: 80, nullable: true})
    descricao: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}