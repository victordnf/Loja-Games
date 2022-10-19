import { IsNotEmpty } from "class-validator";
import { Produto } from "src/Produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_categoria'})
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    @Column({length: 30, nullable: false})
    nomeCategoria: string;

    @IsNotEmpty()
    @Column({length: 120, nullable: true})
    descricaoCategoria: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];
}