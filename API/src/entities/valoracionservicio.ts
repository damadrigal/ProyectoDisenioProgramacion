import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Usuario } from "./usuario";
import {Servicio} from "./servicio";

@ObjectType()
@Entity()
export class ValoracionServicio extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Authorized( )
    @Field(() => Number)
    @Column("text", { nullable: true })
    valoracion!: Number;

    @Authorized( )
    @ManyToOne( type => Servicio, servicio => servicio.ValoracionesServicio)
    @Field(() => Servicio)
    @Column("text", { nullable: true })
    servicio!: Servicio;

    @Authorized( )
    @ManyToOne( type => Usuario, usuario => usuario.valoraciones)
    @Field(type => Usuario)
    @Column("text", { nullable: true })
    usuario!: Usuario;
}