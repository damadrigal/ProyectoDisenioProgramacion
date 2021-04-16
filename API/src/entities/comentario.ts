import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { RolesTypes } from "../enum/roles.enum";
import { EstadosTypes } from "../enum/estados.enum";
import { Usuario } from "./usuario";
import {Servicio} from "./servicio";

@ObjectType()
@Entity()
export class Comentario extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized( )
    @Field(() => String)
    @Column("text", { nullable: true })
    descripcion!: string;

    @Authorized( )
    @Field(() => Servicio)
    @Column("text", { nullable: true })
    servicio!: Servicio;

    @Authorized( )
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;

    @Authorized( )
    @Field(type => EstadosTypes)
    @Column("text")
    estado!: EstadosTypes;

    @Authorized( )
    @Field(type => Comentario)
    @Column("text")
    comentarioPadre!: Comentario;
}