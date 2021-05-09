import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import { Comentario } from "./comentario";
import { EstadosTypes } from "../enum/estados.enum";

@ObjectType()
@Entity()
export class InfoReportada extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized( )
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    /*@Authorized( )
    @ManyToOne( type => Usuario, usuario => usuario.id)
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;*/

    @Authorized( )
    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @Authorized( )
    @ManyToOne(() => Comentario, comentario => comentario.id, { lazy: true })
    @Field(type => Comentario)
    @Column("text",{nullable: true})
    comentario!: Comentario;
}